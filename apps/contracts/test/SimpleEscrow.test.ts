import { expect } from 'chai';
import { ethers } from 'hardhat';
import { SimpleEscrow } from '../typechain-types';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';

describe('SimpleEscrow', function () {
  let escrow: SimpleEscrow;
  let mockUSDC: any;
  let owner: SignerWithAddress;
  let client: SignerWithAddress;
  let freelancer: SignerWithAddress;
  let arbiter: SignerWithAddress;

  const INITIAL_BALANCE = ethers.parseUnits('10000', 6); // 10,000 USDC
  const DEAL_AMOUNT = ethers.parseUnits('1000', 6); // 1,000 USDC

  beforeEach(async function () {
    [owner, client, freelancer, arbiter] = await ethers.getSigners();

    // Deploy mock USDC
    const MockERC20 = await ethers.getContractFactory('MockERC20');
    mockUSDC = await MockERC20.deploy('USD Coin', 'USDC', 6);
    await mockUSDC.waitForDeployment();

    // Mint USDC to client
    await mockUSDC.mint(client.address, INITIAL_BALANCE);

    // Deploy escrow
    const SimpleEscrow = await ethers.getContractFactory('SimpleEscrow');
    escrow = await SimpleEscrow.deploy(await mockUSDC.getAddress(), arbiter.address);
    await escrow.waitForDeployment();
  });

  describe('Deployment', function () {
    it('Should set the right owner', async function () {
      expect(await escrow.owner()).to.equal(owner.address);
    });

    it('Should set the right arbiter', async function () {
      expect(await escrow.arbiter()).to.equal(arbiter.address);
    });

    it('Should set the right USDC address', async function () {
      expect(await escrow.usdc()).to.equal(await mockUSDC.getAddress());
    });
  });

  describe('Create Deal', function () {
    it('Should create a deal successfully', async function () {
      await mockUSDC.connect(client).approve(await escrow.getAddress(), DEAL_AMOUNT);

      await expect(
        escrow.connect(client).createDeal(freelancer.address, DEAL_AMOUNT, 'project-123')
      )
        .to.emit(escrow, 'DealCreated')
        .withArgs(0, client.address, freelancer.address, DEAL_AMOUNT, 'project-123');

      const deal = await escrow.getDeal(0);
      expect(deal.client).to.equal(client.address);
      expect(deal.freelancer).to.equal(freelancer.address);
      expect(deal.amount).to.equal(DEAL_AMOUNT);
    });

    it('Should fail with invalid freelancer', async function () {
      await mockUSDC.connect(client).approve(await escrow.getAddress(), DEAL_AMOUNT);

      await expect(
        escrow.connect(client).createDeal(ethers.ZeroAddress, DEAL_AMOUNT, 'project-123')
      ).to.be.revertedWith('Invalid freelancer');
    });
  });

  describe('Submit Work', function () {
    beforeEach(async function () {
      await mockUSDC.connect(client).approve(await escrow.getAddress(), DEAL_AMOUNT);
      await escrow.connect(client).createDeal(freelancer.address, DEAL_AMOUNT, 'project-123');
    });

    it('Should allow freelancer to submit work', async function () {
      await expect(escrow.connect(freelancer).submitWork(0)).to.emit(escrow, 'WorkSubmitted');

      const deal = await escrow.getDeal(0);
      expect(deal.submittedAt).to.be.gt(0);
    });

    it('Should fail if not freelancer', async function () {
      await expect(escrow.connect(client).submitWork(0)).to.be.revertedWith('Only freelancer');
    });
  });

  describe('Release Payment', function () {
    beforeEach(async function () {
      await mockUSDC.connect(client).approve(await escrow.getAddress(), DEAL_AMOUNT);
      await escrow.connect(client).createDeal(freelancer.address, DEAL_AMOUNT, 'project-123');
    });

    it('Should allow client to release payment', async function () {
      const initialBalance = await mockUSDC.balanceOf(freelancer.address);

      await expect(escrow.connect(client).releasePayment(0)).to.emit(escrow, 'PaymentReleased');

      const deal = await escrow.getDeal(0);
      expect(deal.released).to.be.true;

      const finalBalance = await mockUSDC.balanceOf(freelancer.address);
      expect(finalBalance).to.be.gt(initialBalance);
    });

    it('Should fail if not client', async function () {
      await expect(escrow.connect(freelancer).releasePayment(0)).to.be.revertedWith(
        'Only client'
      );
    });
  });
});
