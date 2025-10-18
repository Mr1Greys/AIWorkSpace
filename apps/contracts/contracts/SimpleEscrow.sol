// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title SimpleEscrow
 * @dev Escrow contract for AIWorkSpace platform
 * Handles USDC payments between clients and freelancers
 */
contract SimpleEscrow is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    IERC20 public immutable usdc;
    address public arbiter;
    uint256 public platformFee = 300; // 3% (basis points)
    uint256 public constant MAX_FEE = 1000; // 10% max
    uint256 public constant AUTO_RELEASE_DELAY = 7 days;

    struct Deal {
        address client;
        address freelancer;
        uint256 amount;
        uint256 createdAt;
        uint256 submittedAt;
        bool released;
        bool disputed;
        string projectId;
    }

    mapping(uint256 => Deal) public deals;
    uint256 public dealCounter;

    event DealCreated(
        uint256 indexed dealId,
        address indexed client,
        address indexed freelancer,
        uint256 amount,
        string projectId
    );
    event WorkSubmitted(uint256 indexed dealId, uint256 submittedAt);
    event PaymentReleased(uint256 indexed dealId, uint256 amount, uint256 fee);
    event DisputeRaised(uint256 indexed dealId, address indexed raiser);
    event DisputeResolved(uint256 indexed dealId, address winner, uint256 amount);

    constructor(address _usdc, address _arbiter) Ownable(msg.sender) {
        require(_usdc != address(0), "Invalid USDC address");
        require(_arbiter != address(0), "Invalid arbiter address");
        usdc = IERC20(_usdc);
        arbiter = _arbiter;
    }

    /**
     * @dev Create new escrow deal
     */
    function createDeal(
        address _freelancer,
        uint256 _amount,
        string calldata _projectId
    ) external nonReentrant returns (uint256) {
        require(_freelancer != address(0), "Invalid freelancer");
        require(_amount > 0, "Amount must be > 0");
        require(bytes(_projectId).length > 0, "Invalid project ID");

        usdc.safeTransferFrom(msg.sender, address(this), _amount);

        uint256 dealId = dealCounter++;
        deals[dealId] = Deal({
            client: msg.sender,
            freelancer: _freelancer,
            amount: _amount,
            createdAt: block.timestamp,
            submittedAt: 0,
            released: false,
            disputed: false,
            projectId: _projectId
        });

        emit DealCreated(dealId, msg.sender, _freelancer, _amount, _projectId);
        return dealId;
    }

    /**
     * @dev Freelancer submits work
     */
    function submitWork(uint256 _dealId) external {
        Deal storage deal = deals[_dealId];
        require(msg.sender == deal.freelancer, "Only freelancer");
        require(!deal.released, "Already released");
        require(!deal.disputed, "Deal disputed");
        require(deal.submittedAt == 0, "Already submitted");

        deal.submittedAt = block.timestamp;
        emit WorkSubmitted(_dealId, block.timestamp);
    }

    /**
     * @dev Client releases payment
     */
    function releasePayment(uint256 _dealId) external nonReentrant {
        Deal storage deal = deals[_dealId];
        require(msg.sender == deal.client, "Only client");
        require(!deal.released, "Already released");
        require(!deal.disputed, "Deal disputed");

        _executeRelease(_dealId);
    }

    /**
     * @dev Auto-release after delay
     */
    function autoRelease(uint256 _dealId) external nonReentrant {
        Deal storage deal = deals[_dealId];
        require(deal.submittedAt > 0, "Work not submitted");
        require(!deal.released, "Already released");
        require(!deal.disputed, "Deal disputed");
        require(
            block.timestamp >= deal.submittedAt + AUTO_RELEASE_DELAY,
            "Auto-release delay not passed"
        );

        _executeRelease(_dealId);
    }

    /**
     * @dev Raise dispute
     */
    function raiseDispute(uint256 _dealId) external {
        Deal storage deal = deals[_dealId];
        require(
            msg.sender == deal.client || msg.sender == deal.freelancer,
            "Not authorized"
        );
        require(!deal.released, "Already released");
        require(!deal.disputed, "Already disputed");

        deal.disputed = true;
        emit DisputeRaised(_dealId, msg.sender);
    }

    /**
     * @dev Resolve dispute (arbiter only)
     */
    function resolveDispute(uint256 _dealId, address _winner) external nonReentrant {
        require(msg.sender == arbiter, "Only arbiter");
        Deal storage deal = deals[_dealId];
        require(deal.disputed, "Not disputed");
        require(!deal.released, "Already released");
        require(
            _winner == deal.client || _winner == deal.freelancer,
            "Invalid winner"
        );

        deal.released = true;
        usdc.safeTransfer(_winner, deal.amount);

        emit DisputeResolved(_dealId, _winner, deal.amount);
    }

    /**
     * @dev Internal: Execute payment release
     */
    function _executeRelease(uint256 _dealId) private {
        Deal storage deal = deals[_dealId];
        deal.released = true;

        uint256 fee = (deal.amount * platformFee) / 10000;
        uint256 freelancerAmount = deal.amount - fee;

        usdc.safeTransfer(deal.freelancer, freelancerAmount);
        if (fee > 0) {
            usdc.safeTransfer(owner(), fee);
        }

        emit PaymentReleased(_dealId, freelancerAmount, fee);
    }

    /**
     * @dev Update platform fee (owner only)
     */
    function setPlatformFee(uint256 _newFee) external onlyOwner {
        require(_newFee <= MAX_FEE, "Fee too high");
        platformFee = _newFee;
    }

    /**
     * @dev Update arbiter (owner only)
     */
    function setArbiter(address _newArbiter) external onlyOwner {
        require(_newArbiter != address(0), "Invalid arbiter");
        arbiter = _newArbiter;
    }

    /**
     * @dev Get deal details
     */
    function getDeal(uint256 _dealId) external view returns (Deal memory) {
        return deals[_dealId];
    }
}
