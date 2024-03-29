import { run } from "hardhat";

export async function verify(contractAddress: any, args: any[]) {
  console.log("Verifying contract at address:", contractAddress);
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
    console.log("Contract verified!");
  } catch (err: any) {
    if (err.message.includes("Contract source code already verified")) {
      console.log("Contract already verified!");
    } else {
      console.error(err);
    }
  }
}
