/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-toolbox");
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.5.0",
      },
      {
        version: "0.8.0"
      }
    ],
  },
  // settings: {
  //   optimizer: {
  //     enabled: true,
  //     runs: 20
  //   }
  // },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
    }
  },
};
