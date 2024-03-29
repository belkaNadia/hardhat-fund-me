import { network } from "hardhat";
import { developmentChains, networkConfig } from "../helper-hardhat-config";
import { verify } from "../utils/verify";

const deployFundMe = async ({
  deployments,
  getNamedAccounts,
}: {
  deployments: any;
  getNamedAccounts: any;
}) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  const chainId = network.config.chainId || 0;

  // const ethUsdPriceFeed = networkConfig[chainId]?.["ethUsdPriceFeed"] ?? null; // Add nullish coalescing operator

  let ethUsdPriceFeedAddress;
  if (developmentChains.includes(network.name)) {
    const ethUsdAggregaor = await deployments.get("MockV3Aggregator");
    ethUsdPriceFeedAddress = ethUsdAggregaor.address;
  } else {
    ethUsdPriceFeedAddress = networkConfig[chainId]?.["ethUsdPriceFeed"];
  }

  const fundMe = await deploy("FundMe", {
    from: deployer,
    args: [ethUsdPriceFeedAddress], // Update args with price feed address
    log: true,
    waitConfirmations: networkConfig[chainId]?.blockConfirmations || 0,
  });
  log("___________________");
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    log(
      `Verify with\nnpx hardhat verify --network ${network.name} ${fundMe.address} ${ethUsdPriceFeedAddress}`
    );
    await verify(fundMe.address, [ethUsdPriceFeedAddress]);
  }
};

export default deployFundMe;
deployFundMe.tags = ["all", "fundMe"];
