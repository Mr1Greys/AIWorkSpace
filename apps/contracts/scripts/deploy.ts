import { ethers } from 'hardhat';

async function main() {
  console.log('🚀 Deploying SimpleEscrow contract...');

  const [deployer] = await ethers.getSigners();
  console.log('Deploying with account:', deployer.address);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log('Account balance:', ethers.formatEther(balance), 'ETH');

  // USDC addresses
  const USDC_BASE = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';
  const USDC_POLYGON = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174';

  // Use Base USDC by default
  const usdcAddress = process.env.USDC_ADDRESS || USDC_BASE;
  const arbiterAddress = process.env.ARBITER_ADDRESS || deployer.address;

  console.log('USDC Address:', usdcAddress);
  console.log('Arbiter Address:', arbiterAddress);

  const SimpleEscrow = await ethers.getContractFactory('SimpleEscrow');
  const escrow = await SimpleEscrow.deploy(usdcAddress, arbiterAddress);

  await escrow.waitForDeployment();

  const escrowAddress = await escrow.getAddress();
  console.log('✅ SimpleEscrow deployed to:', escrowAddress);

  // Save deployment info
  const deploymentInfo = {
    network: (await ethers.provider.getNetwork()).name,
    chainId: (await ethers.provider.getNetwork()).chainId,
    escrowAddress,
    usdcAddress,
    arbiterAddress,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
  };

  console.log('\n📝 Deployment Info:');
  console.log(JSON.stringify(deploymentInfo, null, 2));

  console.log('\n⚠️  Remember to:');
  console.log('1. Update .env with ESCROW_ADDRESS=' + escrowAddress);
  console.log('2. Verify contract on block explorer');
  console.log('3. Test contract functions');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
