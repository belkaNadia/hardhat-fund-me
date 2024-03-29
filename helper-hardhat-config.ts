export interface networkConfigItem {
  ethUsdPriceFeed?: string;
  blockConfirmations?: number;
  name?: string;
}

export interface networkConfigInfo {
  [key: string]: networkConfigItem;
}

export const networkConfig: networkConfigInfo = {
  11155111: {
    name: "sepolia",
    ethUsdPriceFeed: "0x447Fd5eC2D383091C22B8549cb231a3bAD6d3fAf",
    blockConfirmations: 6,
  },
};

export const developmentChains = ["hardhat", "localhost"];

export const DECIMALS = 8;
export const INITIAL_ANSWER = 1000000000;
