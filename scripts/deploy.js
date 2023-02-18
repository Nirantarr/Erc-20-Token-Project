const hre = require("hardhat");

async function main() {

  const NiruToken = await hre.ethers.getContractFactory("NiruToken");
  const nirutoken = await NiruToken.deploy(10000);

  await nirutoken.deployed();

  console.log(` Deployed to ${nirutoken.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
