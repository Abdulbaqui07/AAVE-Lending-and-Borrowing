const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai")
const hre = require("hardhat");

async function deployContractFixture() {
    const [addr1, addr2, addr3, addr4, addr5, addr6, addr7] = await hre.ethers.getSigners();
    const contractAddressProvider = await ethers.getContractFactory('LendingPoolAddressesProvider');
    const addressProvider = await contractAddressProvider.deploy();
    //const contract = await ethers.getContractFactory('LendingPool');
    //const multiSig = await contract.deploy([addr2.address,addr3.address]);

    return { addressProvider, addr1, addr2, addr3, addr4, addr5, addr6, addr7 }
}

describe("deploy", () => {
    it("should deployed the contract", async () => {
        const { addressProvider, addr1 } = await loadFixture(deployContractFixture);
        console.log("1");

        console.log("Address of address provider : ", addressProvider.address);
    })

    it("should deploy lending pool & set address of it in Address provider", async () => {
        const { addressProvider, addr1 } = await loadFixture(deployContractFixture);

        const contractLendingPool = await ethers.getContractFactory('LendingPool');
        const LendingPool = await contractLendingPool.deploy();
        const addAddressOfAddressProvider = await LendingPool.initialize(addressProvider.address);
        console.log("2");
        console.log("Address of lending pool : ", LendingPool.address);

        // setting it in address provider
        const Assign = await addressProvider.setLendingPoolImpl(LendingPool.address);
        Assign.wait()

        // getting  proxy contract
        const lendingPoolProxy = await addressProvider.getLendingPool();
        console.log("Address of proxy contract of lending pool", lendingPoolProxy)
        //expect(await addressProvider.getLendingPool()).to.be.equal(LendingPool.address);

    })

    it("should deploy the lending pool core & set value in address provider", async () => {
        const { addressProvider, addr1 } = await loadFixture(deployContractFixture);

        const contractLendingCore = await ethers.getContractFactory('LendingPoolCore');
        const lendingCore = await contractLendingCore.deploy();

        console.log("address of lending pool core : ", lendingCore.address);

        // initialise
        const initialize = await lendingCore.initialize(addressProvider.address);
        //  initialize.wait();

        // setting it in address provider
        const set = await addressProvider.setLendingPoolCoreImpl(lendingCore.address);
        set.wait();

        // getting  proxy contract
        const proxyContractOfLendingPoolCore = await addressProvider.getLendingPoolCore();
        console.log("address of proxy contract of lending pool core : ", proxyContractOfLendingPoolCore)

    })

    it("should deploy the lending configurator", async () => {
        const { addressProvider, addr1 } = await loadFixture(deployContractFixture);

        const contractLendingPool = await ethers.getContractFactory('LendingPoolConfigurator');
        const LendingPoolConfigurator = await contractLendingPool.deploy();

        console.log("address of lending pool configurator : ", LendingPoolConfigurator.address);

        // initialise
        const initialize = await LendingPoolConfigurator.initialize(addressProvider.address);
        initialize.wait();

        // setting it in address provider
        const set = await addressProvider.setLendingPoolCoreImpl(LendingPoolConfigurator.address);
        set.wait();

        // getting proxy contract
        const proxyContractOfLendingPoolConfigurator = await addressProvider.getLendingPoolCore();
        console.log("Address of proxy contract of lending pool core : ", proxyContractOfLendingPoolConfigurator);

    })

    it("should deploy the lending pool data provider & set value in address provider", async () => {
        const { addressProvider, addr1 } = await loadFixture(deployContractFixture);

        const contractLendingPoolDataProvider = await ethers.getContractFactory('LendingPoolDataProvider');
        const lendingPoolDataProvider = await contractLendingPoolDataProvider.deploy();

        console.log("Address of lending pool data provider : ", lendingPoolDataProvider.address);

        // initialise
        const initialize = await lendingPoolDataProvider.initialize(addressProvider.address);
        initialize.wait();

        // setting it in address provider
        const set = await addressProvider.setLendingPoolDataProviderImpl(lendingPoolDataProvider.address);
        set.wait();

        // getting  proxy contract
        const proxyContractOfLendingPoolDataProvider = await addressProvider.getLendingPoolDataProvider();
        console.log("Address of proxy contract of lending pool core : ", proxyContractOfLendingPoolDataProvider);

    })

    it("should deploy the parameter provider & set it in address provider", async () => {
        const { addressProvider, addr1 } = await loadFixture(deployContractFixture);

        const contractLendingPoolParameterProvider = await ethers.getContractFactory('LendingPoolParametersProvider');
        const lendingPoolParameterProvider = await contractLendingPoolParameterProvider.deploy();

        console.log("Address of lending pool parameter provider : ", lendingPoolParameterProvider.address);

        // initialise
        // const initialize = await lendingPoolParameterProvider.initialize(addressProvider.address);
        // initialize.wait();

        // setting it in address provider
        const set = await addressProvider.setLendingPoolParametersProviderImpl(lendingPoolParameterProvider.address);
        set.wait();

        // getting  proxy contract
        const proxyContractOfLendingPoolParameterProvider = await addressProvider.getLendingPoolParametersProvider();
        console.log("Address of proxy contract of lending pool core : ", proxyContractOfLendingPoolParameterProvider);

    })

    it("should deploy the fee provider and set it to address provider", async () => {
        const { addressProvider, addr1 } = await loadFixture(deployContractFixture);

        const contractFeeProvider = await ethers.getContractFactory('FeeProvider');
        const feeProvider = await contractFeeProvider.deploy();

        console.log("Address of fee provider : ", feeProvider.address);

        // initialise
        const initialize = await feeProvider.initialize(addressProvider.address);
        initialize.wait();

        // setting it in address provider
        const set = await addressProvider.setFeeProviderImpl(feeProvider.address);
        set.wait();

        // getting proxy contract
        const proxyContractOfFeeProvider = await addressProvider.getFeeProvider();
        console.log("Address of proxy contract of lending pool fee provider : ", proxyContractOfFeeProvider);
        
    })
})