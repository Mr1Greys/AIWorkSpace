export const PLATFORM_FEE = 0.03; // 3%
export const AUTO_RELEASE_DAYS = 7;
export const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB
export const MAX_CASES_PER_USER = 10;
export const FREE_TIER_RESPONSES = 5;
export const PRO_TIER_PRICE = 10; // USD per month

export const SUPPORTED_CHAINS = {
  BASE: {
    id: 8453,
    name: 'Base',
    rpcUrl: 'https://mainnet.base.org',
    blockExplorer: 'https://basescan.org',
  },
  POLYGON: {
    id: 137,
    name: 'Polygon',
    rpcUrl: 'https://polygon-rpc.com',
    blockExplorer: 'https://polygonscan.com',
  },
} as const;

export const USDC_ADDRESSES = {
  [SUPPORTED_CHAINS.BASE.id]: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
  [SUPPORTED_CHAINS.POLYGON.id]: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
} as const;

export const POPULAR_TAGS = [
  'React',
  'Node.js',
  'TypeScript',
  'Python',
  'AI/ML',
  'Web3',
  'Solidity',
  'Smart Contracts',
  'UI/UX Design',
  'Figma',
  'PostgreSQL',
  'MongoDB',
  'AWS',
  'Docker',
  'DevOps',
  'Mobile Development',
  'Flutter',
  'React Native',
  'Backend',
  'Frontend',
] as const;

export const CASE_TYPES = [
  'Product',
  'Automation',
  'AI Solution',
  'Design',
  'Bot',
  'Backend',
  'Web3',
  'Mobile App',
  'Landing Page',
  'Full Stack',
] as const;
