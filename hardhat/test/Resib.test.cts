import { expect } from 'chai';
import hre from 'hardhat';
import { time, loadFixture} from '@nomicfoundation/hardhat-toolbox-viem/network-helpers';

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
        expect(testStore.name).to.be.eq('');
    });

    // Product CRUD Tests
    it("should be able to create and get products", async () => {
        const { cResib } = await loadFixture(deployFixture); 
        await cResib.write.createStore(["sampleStore"]);
        await cResib.write.createProduct(["sampleProduct", 1, 21]);

        const testProduct = await cResib.read.getProduct([1])
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

        const testProduct = await cResib.read.getProduct([1])
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
        const testProduct = await cResib.read.getProduct([1])
        expect(testProduct.id).to.be.eq(0n);
        expect(testProduct.name).to.be.eq('');
        expect(testProduct.storeId).to.be.eq(0n);
        expect(testProduct.warrantyPeriod).to.be.eq(0n);
    });

});
