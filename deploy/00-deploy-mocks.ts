import { network } from "hardhat";

import {
  DECIMALS,
  INITIAL_ANSWER,
  developmentChains,
} from "../helper-hardhat-config";
module.exports.default = async ({
  deployments,
  getNamedAccounts,
}: {
  deployments: any;
  getNamedAccounts: any;
}) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  const chainId = network.config.chainId || 0;

  if (developmentChains.includes(network.name)) {
    console.log("Local network detected! Deploying mocks");
    await deploy("MockV3Aggregator", {
      contract: "MockV3Aggregator",
      from: deployer,
      args: [DECIMALS, INITIAL_ANSWER], // Update args with price feed address
      log: true,
    });
  }
  log("Deployed MockV3Aggregator");
  log("__________________");
};

module.exports.tags = ["all", "mocks"];
