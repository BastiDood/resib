async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
  
    const StoreProductWarranty = await ethers.getContractFactory("StoreProductWarranty");
    const storeProductWarranty = await StoreProductWarranty.deploy();
  
    console.log("StoreProductWarranty contract deployed to:", storeProductWarranty.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  