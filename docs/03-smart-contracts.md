# Smart Contracts (Hardhat)

## 📄 SimpleEscrow.sol

### Основной контракт эскроу для USDC платежей

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title SimpleEscrow
 * @dev Gas-optimized escrow for freelance payments with USDC
 */
contract SimpleEscrow is ReentrancyGuard, Ownable {
    IERC20 public immutable USDC;
    uint256 public constant PLATFORM_FEE = 300; // 3% (basis points)
    uint256 public constant AUTO_RELEASE_PERIOD = 7 days;
    
    struct Deal {
        address client;
        address freelancer;
        uint256 amount;
        uint256 deadline;
        uint256 submittedAt;
        DealStatus status;
    }
    
    enum DealStatus {
        None,
        Funded,
        Submitted,
        Released,
        Disputed,
        Resolved
    }
    
    mapping(uint256 => Deal) public deals;
    mapping(address => bool) public arbiters;
    uint256 public dealCounter;
    
    event DealCreated(uint256 indexed dealId, address client, address freelancer, uint256 amount);
    event WorkSubmitted(uint256 indexed dealId, uint256 timestamp);
    event PaymentReleased(uint256 indexed dealId, uint256 amount, uint256 fee);
    event DisputeRaised(uint256 indexed dealId, address initiator);
    event DisputeResolved(uint256 indexed dealId, uint256 clientAmount, uint256 freelancerAmount);
    
    constructor(address _usdc) {
        USDC = IERC20(_usdc);
    }
    
    /**
     * @dev Create and fund escrow deal
     */
    function createAndFund(
        address _freelancer,
        uint256 _amount,
        uint256 _deadlineDays
    ) external nonReentrant returns (uint256) {
        require(_freelancer != address(0), "Invalid freelancer");
        require(_amount > 0, "Amount must be > 0");
        
        // Transfer USDC from client
        require(
            USDC.transferFrom(msg.sender, address(this), _amount),
            "Transfer failed"
        );
        
        // Create deal (gas optimization: use unchecked)
        uint256 dealId;
        unchecked {
            dealId = ++dealCounter;
        }
        
        deals[dealId] = Deal({
            client: msg.sender,
            freelancer: _freelancer,
            amount: _amount,
            deadline: block.timestamp + (_deadlineDays * 1 days),
            submittedAt: 0,
            status: DealStatus.Funded
        });
        
        emit DealCreated(dealId, msg.sender, _freelancer, _amount);
        return dealId;
    }
    
    /**
     * @dev Freelancer submits work
     */
    function submitWork(uint256 _dealId) external nonReentrant {
        Deal storage deal = deals[_dealId];
        require(msg.sender == deal.freelancer, "Not freelancer");
        require(deal.status == DealStatus.Funded, "Invalid status");
        
        deal.status = DealStatus.Submitted;
        deal.submittedAt = block.timestamp;
        
        emit WorkSubmitted(_dealId, block.timestamp);
    }
    
    /**
     * @dev Client approves and releases payment
     */
    function approveRelease(uint256 _dealId) external nonReentrant {
        Deal storage deal = deals[_dealId];
        require(msg.sender == deal.client, "Not client");
        require(deal.status == DealStatus.Submitted, "Work not submitted");
        
        deal.status = DealStatus.Released;
        
        // Calculate platform fee
        uint256 fee = (deal.amount * PLATFORM_FEE) / 10000;
        uint256 freelancerAmount = deal.amount - fee;
        
        // Transfer to freelancer
        require(USDC.transfer(deal.freelancer, freelancerAmount), "Transfer failed");
        
        // Transfer fee to owner
        require(USDC.transfer(owner(), fee), "Fee transfer failed");
        
        emit PaymentReleased(_dealId, freelancerAmount, fee);
    }
    
    /**
     * @dev Auto-release if deadline passed
     */
    function autoReleaseIfDue(uint256 _dealId) external nonReentrant {
        Deal storage deal = deals[_dealId];
        require(deal.status == DealStatus.Submitted, "Work not submitted");
        require(
            block.timestamp >= deal.submittedAt + AUTO_RELEASE_PERIOD,
            "Auto-release period not reached"
        );
        
        deal.status = DealStatus.Released;
        
        uint256 fee = (deal.amount * PLATFORM_FEE) / 10000;
        uint256 freelancerAmount = deal.amount - fee;
        
        require(USDC.transfer(deal.freelancer, freelancerAmount), "Transfer failed");
        require(USDC.transfer(owner(), fee), "Fee transfer failed");
        
        emit PaymentReleased(_dealId, freelancerAmount, fee);
    }
    
    /**
     * @dev Raise dispute
     */
    function raiseDispute(uint256 _dealId) external nonReentrant {
        Deal storage deal = deals[_dealId];
        require(
            msg.sender == deal.client || msg.sender == deal.freelancer,
            "Not authorized"
        );
        require(
            deal.status == DealStatus.Funded || deal.status == DealStatus.Submitted,
            "Cannot dispute"
        );
        
        deal.status = DealStatus.Disputed;
        emit DisputeRaised(_dealId, msg.sender);
    }
    
    /**
     * @dev Resolve dispute (only arbiter)
     */
    function resolveDispute(
        uint256 _dealId,
        uint256 _clientAmount,
        uint256 _freelancerAmount
    ) external nonReentrant {
        require(arbiters[msg.sender], "Not arbiter");
        
        Deal storage deal = deals[_dealId];
        require(deal.status == DealStatus.Disputed, "Not disputed");
        require(_clientAmount + _freelancerAmount == deal.amount, "Amounts mismatch");
        
        deal.status = DealStatus.Resolved;
        
        if (_clientAmount > 0) {
            require(USDC.transfer(deal.client, _clientAmount), "Client transfer failed");
        }
        if (_freelancerAmount > 0) {
            require(USDC.transfer(deal.freelancer, _freelancerAmount), "Freelancer transfer failed");
        }
        
        emit DisputeResolved(_dealId, _clientAmount, _freelancerAmount);
    }
    
    /**
     * @dev Add/remove arbiter (only owner)
     */
    function setArbiter(address _arbiter, bool _status) external onlyOwner {
        arbiters[_arbiter] = _status;
    }
}
```

---

## 📄 WorkProof.sol (Optional)

### Хранение хэшей работ on-chain

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract WorkProof {
    struct Proof {
        address freelancer;
        bytes32 workHash;
        string title;
        string tags;
        uint256 timestamp;
    }
    
    mapping(uint256 => Proof) public proofs;
    uint256 public proofCounter;
    
    event WorkSubmitted(
        uint256 indexed proofId,
        address indexed freelancer,
        bytes32 workHash,
        string title
    );
    
    function submitProof(
        bytes32 _workHash,
        string memory _title,
        string memory _tags
    ) external returns (uint256) {
        uint256 proofId;
        unchecked {
            proofId = ++proofCounter;
        }
        
        proofs[proofId] = Proof({
            freelancer: msg.sender,
            workHash: _workHash,
            title: _title,
            tags: _tags,
            timestamp: block.timestamp
        });
        
        emit WorkSubmitted(proofId, msg.sender, _workHash, _title);
        return proofId;
    }
    
    function verifyProof(uint256 _proofId, bytes32 _workHash) external view returns (bool) {
        return proofs[_proofId].workHash == _workHash;
    }
}
```

---

## 🔧 Deployment

### hardhat.config.ts

```typescript
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    base: {
      url: process.env.BASE_RPC_URL || "",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 8453
    },
    polygon: {
      url: process.env.POLYGON_RPC_URL || "",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 137
    },
    localhost: {
      url: "http://127.0.0.1:8545"
    }
  },
  etherscan: {
    apiKey: {
      base: process.env.BASESCAN_API_KEY || "",
      polygon: process.env.POLYGONSCAN_API_KEY || ""
    }
  }
};

export default config;
```

### scripts/deploy.ts

```typescript
import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  
  console.log("Deploying contracts with:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());
  
  // USDC address on Base
  const USDC_ADDRESS = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
  
  // Deploy SimpleEscrow
  const SimpleEscrow = await ethers.getContractFactory("SimpleEscrow");
  const escrow = await SimpleEscrow.deploy(USDC_ADDRESS);
  await escrow.deployed();
  
  console.log("SimpleEscrow deployed to:", escrow.address);
  
  // Deploy WorkProof (optional)
  const WorkProof = await ethers.getContractFactory("WorkProof");
  const workProof = await WorkProof.deploy();
  await workProof.deployed();
  
  console.log("WorkProof deployed to:", workProof.address);
  
  // Setup arbiter (Gnosis Safe recommended)
  const ARBITER_ADDRESS = process.env.ARBITER_ADDRESS || deployer.address;
  await escrow.setArbiter(ARBITER_ADDRESS, true);
  console.log("Arbiter set to:", ARBITER_ADDRESS);
  
  // Save deployment info
  const fs = require("fs");
  const deploymentInfo = {
    network: "base",
    escrow: escrow.address,
    workProof: workProof.address,
    arbiter: ARBITER_ADDRESS,
    timestamp: new Date().toISOString()
  };
  
  fs.writeFileSync(
    "deployment.json",
    JSON.stringify(deploymentInfo, null, 2)
  );
  
  console.log("Deployment info saved to deployment.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

---

## 🧪 Testing

### test/SimpleEscrow.test.ts

```typescript
import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { SimpleEscrow, MockERC20 } from "../typechain-types";

describe("SimpleEscrow", function () {
  let escrow: SimpleEscrow;
  let usdc: MockERC20;
  let owner: SignerWithAddress;
  let client: SignerWithAddress;
  let freelancer: SignerWithAddress;
  let arbiter: SignerWithAddress;
  
  beforeEach(async function () {
    [owner, client, freelancer, arbiter] = await ethers.getSigners();
    
    // Deploy mock USDC
    const MockERC20 = await ethers.getContractFactory("MockERC20");
    usdc = await MockERC20.deploy("USDC", "USDC", 6);
    await usdc.deployed();
    
    // Mint USDC to client
    await usdc.mint(client.address, ethers.utils.parseUnits("10000", 6));
    
    // Deploy escrow
    const SimpleEscrow = await ethers.getContractFactory("SimpleEscrow");
    escrow = await SimpleEscrow.deploy(usdc.address);
    await escrow.deployed();
    
    // Set arbiter
    await escrow.setArbiter(arbiter.address, true);
  });
  
  it("should create and fund escrow", async function () {
    const amount = ethers.utils.parseUnits("1000", 6);
    
    // Approve
    await usdc.connect(client).approve(escrow.address, amount);
    
    // Create deal
    const tx = await escrow
      .connect(client)
      .createAndFund(freelancer.address, amount, 14);
    
    const receipt = await tx.wait();
    const event = receipt.events?.find(e => e.event === "DealCreated");
    const dealId = event?.args?.dealId;
    
    const deal = await escrow.deals(dealId);
    expect(deal.amount).to.equal(amount);
    expect(deal.status).to.equal(1); // Funded
  });
  
  it("should submit work and release payment", async function () {
    const amount = ethers.utils.parseUnits("1000", 6);
    
    await usdc.connect(client).approve(escrow.address, amount);
    const tx = await escrow
      .connect(client)
      .createAndFund(freelancer.address, amount, 14);
    const receipt = await tx.wait();
    const dealId = receipt.events?.find(e => e.event === "DealCreated")?.args?.dealId;
    
    // Submit work
    await escrow.connect(freelancer).submitWork(dealId);
    
    const dealBefore = await escrow.deals(dealId);
    expect(dealBefore.status).to.equal(2); // Submitted
    
    // Approve release
    await escrow.connect(client).approveRelease(dealId);
    
    const dealAfter = await escrow.deals(dealId);
    expect(dealAfter.status).to.equal(3); // Released
    
    // Check balances
    const fee = amount.mul(300).div(10000); // 3%
    const freelancerAmount = amount.sub(fee);
    
    const freelancerBalance = await usdc.balanceOf(freelancer.address);
    expect(freelancerBalance).to.equal(freelancerAmount);
  });
  
  it("should auto-release after 7 days", async function () {
    const amount = ethers.utils.parseUnits("1000", 6);
    
    await usdc.connect(client).approve(escrow.address, amount);
    const tx = await escrow
      .connect(client)
      .createAndFund(freelancer.address, amount, 14);
    const receipt = await tx.wait();
    const dealId = receipt.events?.find(e => e.event === "DealCreated")?.args?.dealId;
    
    await escrow.connect(freelancer).submitWork(dealId);
    
    // Fast-forward 7 days
    await ethers.provider.send("evm_increaseTime", [7 * 24 * 60 * 60]);
    await ethers.provider.send("evm_mine", []);
    
    // Auto-release
    await escrow.autoReleaseIfDue(dealId);
    
    const deal = await escrow.deals(dealId);
    expect(deal.status).to.equal(3); // Released
  });
  
  it("should handle dispute resolution", async function () {
    const amount = ethers.utils.parseUnits("1000", 6);
    
    await usdc.connect(client).approve(escrow.address, amount);
    const tx = await escrow
      .connect(client)
      .createAndFund(freelancer.address, amount, 14);
    const receipt = await tx.wait();
    const dealId = receipt.events?.find(e => e.event === "DealCreated")?.args?.dealId;
    
    await escrow.connect(freelancer).submitWork(dealId);
    
    // Raise dispute
    await escrow.connect(client).raiseDispute(dealId);
    
    const dealDisputed = await escrow.deals(dealId);
    expect(dealDisputed.status).to.equal(4); // Disputed
    
    // Resolve: 40% client, 60% freelancer
    const clientAmount = amount.mul(40).div(100);
    const freelancerAmount = amount.mul(60).div(100);
    
    await escrow
      .connect(arbiter)
      .resolveDispute(dealId, clientAmount, freelancerAmount);
    
    const dealResolved = await escrow.deals(dealId);
    expect(dealResolved.status).to.equal(5); // Resolved
    
    const clientBalance = await usdc.balanceOf(client.address);
    expect(clientBalance).to.equal(
      ethers.utils.parseUnits("10000", 6).sub(amount).add(clientAmount)
    );
  });
});
```

---

## ⚡ Gas Optimization

### Рекомендации

1. **Используйте `unchecked` для безопасных операций**
```solidity
unchecked {
    dealId = ++dealCounter;
}
```

2. **Используйте `immutable` для констант**
```solidity
IERC20 public immutable USDC;
```

3. **Минимизируйте storage writes**
```solidity
// Плохо: 2 writes
deal.status = DealStatus.Submitted;
deal.submittedAt = block.timestamp;

// Хорошо: 1 write (с оптимизацией компилятора)
Deal storage deal = deals[_dealId];
deal.status = DealStatus.Submitted;
deal.submittedAt = block.timestamp;
```

4. **Используйте `calldata` вместо `memory`**
```solidity
function submitProof(bytes32 _hash, string calldata _title) external
```

5. **Batch операции**
```solidity
function batchRelease(uint256[] calldata _dealIds) external
```

---

## 🔒 Security Best Practices

### 1. ReentrancyGuard
Все функции с переводами токенов должны использовать `nonReentrant`.

### 2. Multi-sig для арбитража
Используйте Gnosis Safe вместо EOA для адреса арбитра.

### 3. Timelock для критичных изменений
```solidity
uint256 public constant TIMELOCK_DELAY = 2 days;
```

### 4. Audits
- OpenZeppelin Contracts (проверенные)
- Внешний аудит перед mainnet
- Bug bounty программа

### 5. Emergency pause
```solidity
bool public paused;

modifier whenNotPaused() {
    require(!paused, "Contract paused");
    _;
}
```

---

## 📦 Contract Addresses

### Base Mainnet
```
USDC: 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913
SimpleEscrow: [to be deployed]
WorkProof: [to be deployed]
```

### Polygon Mainnet (Fallback)
```
USDC: 0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174
SimpleEscrow: [to be deployed]
WorkProof: [to be deployed]
```

---

[← Назад: Backend API](02-backend-api.md) | [Далее: Database →](04-database.md)
