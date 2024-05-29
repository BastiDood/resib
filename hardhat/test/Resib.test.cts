import { expect } from 'chai';
import hre from 'hardhat';
import { time, loadFixture} from '@nomicfoundation/hardhat-toolbox-viem/network-helpers';
import { getAddress } from 'viem';

async function deployFixture(){
    const [owner, otherAccount] = await hre.viem.getWalletClients();
    const cResib = await hre.viem.deployContract("Resib");
    return { cResib, owner, otherAccount };
}   

describe('Resib Contract Tests', () => {

    it("should deploy", async () => {
        const { cResib } = await loadFixture(deployFixture);
        expect(cResib).not.to.be.undefined;
    });

    // Store CRUD Tests
    it("should be able to create and get stores", async () => {
        const { cResib } = await loadFixture(deployFixture); 
        await cResib.write.createStore(["sampleStore"]);
        const testStore = await cResib.read.getStore([1]);
        expect(testStore.id).to.be.eq(1n);
        expect(testStore.name).to.be.eq("sampleStore");
    });
    
    it("should be able to update stores", async () => {
        const { cResib } = await loadFixture(deployFixture); 
        await cResib.write.createStore(["sampleStore"]);
        await cResib.write.updateStore([1, "newStore"]);
        const testStore = await cResib.read.getStore([1]);
        expect(testStore.name).to.be.eq("newStore");
    });
    
    it("should be able to delete stores", async () => {
        const { cResib } = await loadFixture(deployFixture); 
        await cResib.write.createStore(["sampleStore"]);
        await cResib.write.deleteStore([1]);
        // Not sure how to test the non-existence of a store
        const testStore = await cResib.read.getStore([1]);
        expect(testStore.id).to.be.eq(0n);
        expect(testStore.name).to.be.eq('');
        expect(testStore.owner).to.be.eq("0x0000000000000000000000000000000000000000");
    });

    // Product CRUD Tests
    it("should be able to create and get products", async () => {
        const { cResib } = await loadFixture(deployFixture); 
        await cResib.write.createStore(["sampleStore"]);
        await cResib.write.createProduct(["sampleProduct", 1, 21]);

        const testProduct = await cResib.read.getProduct([1]);
        expect(testProduct.id).to.be.eq(1n);
        expect(testProduct.name).to.be.eq("sampleProduct");
        expect(testProduct.storeId).to.be.eq(1n);
        expect(testProduct.warrantyPeriod).to.be.eq(21n);
    });

    it("should be able to update products", async () => {
        const { cResib } = await loadFixture(deployFixture); 
        await cResib.write.createStore(["sampleStore"]);
        await cResib.write.createProduct(["sampleProduct", 1, 21]);

        await cResib.write.updateProduct([1, "newProduct", 25]);

        const testProduct = await cResib.read.getProduct([1]);
        expect(testProduct.id).to.be.eq(1n);
        expect(testProduct.name).to.be.eq("newProduct");
        expect(testProduct.storeId).to.be.eq(1n);
        expect(testProduct.warrantyPeriod).to.be.eq(25n);
    });

    it("should be able to delete products", async () => {
        const { cResib } = await loadFixture(deployFixture); 
        await cResib.write.createStore(["sampleStore"]);
        await cResib.write.createProduct(["sampleProduct", 1, 21]);

        await cResib.write.deleteProduct([1]);

        // Again, not sure how to test non-existence of a product
        const testProduct = await cResib.read.getProduct([1]);
        expect(testProduct.id).to.be.eq(0n);
        expect(testProduct.name).to.be.eq('');
        expect(testProduct.storeId).to.be.eq(0n);
        expect(testProduct.warrantyPeriod).to.be.eq(0n);
    });

    // Warranty CRUD Tests
    it("should be able to create and get warranties", async () => {
        const { cResib, owner } = await loadFixture(deployFixture);
        // Important for preserving address checksum
        const ownerAddress = getAddress(owner?.account.address); 

        await cResib.write.createStore(["sampleStore"]);
        await cResib.write.createProduct(["sampleProduct", 1, 21]);
        await cResib.write.createWarranty([1, ownerAddress]);

        const testWarranty = await cResib.read.getWarranty([1]);
        expect(testWarranty.id).to.be.eq(1n);
        expect(testWarranty.productId).to.be.eq(1n);
        expect(testWarranty.customer).to.be.eq(ownerAddress);
    });

    it("should be able to update warranties", async () => {
        const { cResib, owner } = await loadFixture(deployFixture);
        const ownerAddress = getAddress(owner?.account.address); 

        await cResib.write.createStore(["sampleStore"]);
        await cResib.write.createProduct(["sampleProduct", 1, 21]);
        await cResib.write.createWarranty([1, ownerAddress]);

        await cResib.write.updateWarranty([1, 500, 1000]);

        const testWarranty = await cResib.read.getWarranty([1]);
        expect(testWarranty.id).to.be.eq(1n);
        expect(testWarranty.startDate).to.be.eq(500n);
        expect(testWarranty.endDate).to.be.eq(1000n);
    });

    it("should be able to delete warranties", async () => {
        const { cResib, owner } = await loadFixture(deployFixture);
        const ownerAddress = getAddress(owner?.account.address); 

        await cResib.write.createStore(["sampleStore"]);
        await cResib.write.createProduct(["sampleProduct", 1, 21]);
        await cResib.write.createWarranty([1, ownerAddress]);

        await cResib.write.deleteWarranty([1]);

        // Again, not sure how to test non-existence of a product
        const testWarranty = await cResib.read.getWarranty([1]);
        expect(testWarranty.id).to.be.eq(0n);
        expect(testWarranty.productId).to.be.eq(0n);
        expect(testWarranty.customer).to.be.eq("0x0000000000000000000000000000000000000000");
        expect(testWarranty.startDate).to.be.eq(0n);
        expect(testWarranty.endDate).to.be.eq(0n);
    });

});
