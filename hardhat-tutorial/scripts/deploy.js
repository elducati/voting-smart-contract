const { ethers } = require("hardhat");
const { CRYPTODEVS_NFT_CONTRACT_ADDRESS } = require("../constants");

async function main() { 

  // Now deploy the Ballot contract
  const Ballot = await ethers.getContractFactory("Ballot");
  const ballot = await Ballot.deploy(['0x5261696c61000000000000000000000000000000000000000000000000000000',
'0x5275746f00000000000000000000000000000000000000000000000000000000',
'0x4b61727561000000000000000000000000000000000000000000000000000000',
'0x456c447563617469000000000000000000000000000000000000000000000000']);
  await ballot.deployed();

  console.log("ballot deployed to: ", ballot.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });