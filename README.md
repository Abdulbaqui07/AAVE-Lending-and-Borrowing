# [Aave Protocol](https://aave.com/);

Open source implementation of the Aave Decentralized Lending Pools protocol. Version 1.0

Aave is a decentralised non-custodial liquidity protocol where users can participate as depositors or borrowers. Depositors provide liquidity to the market to earn a passive income, while borrowers are able to borrow in an over-collateralised (perpetually) or under-collateralised (one-block liquidity) fashion.

<p align="center">
 <img src="https://user-images.githubusercontent.com/87430736/198200803-c70fc71d-4c52-4b14-9937-b9b740d009e3.png">
</p>

## Documentation

It is possible to find documention to integrate the Aave Protocol on [developers.aave.com](https://developers.aave.com)

For a deep explanation of the Aave Protocol, read the [White Paper](./docs/Aave_Protocol_Whitepaper_v1_0.pdf)


## Source code

The source code included is the updated version of the protocol, reengineered to it's initial version like (ETHLEND) with only support of lending and borrowing. Eventual changes (smart contracts updates, bug fixes, etc.) will be applied through subsequent merge requests.

## Steps to Implement

After forking repo type ```npm i``` in your terminal.

Check package.json whether all the required package are installed.

To compile smart-contracts type ```npx hardhat compile```.

To test the smart-contract type ```npx hardhat test```.
