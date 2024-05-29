import '@nomicfoundation/hardhat-toolbox';
import { assert, expect } from 'chai';
import { ethers } from 'hardhat';
import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers';

async function deployFixture() {
    const [owner] = await ethers.getSigners();
    assert(typeof owner !== 'undefined');
    const factory = await ethers.getContractFactory('Resib');
    const Resib = await factory.deploy();
    await Resib.waitForDeployment();
    const resib = await Resib.getAddress();
    return { Resib, resib, owner };
}

describe('Resib', () => {
    describe('Store', () => {
        it('should be able to create and get stores', async () => {
            const { Resib } = await loadFixture(deployFixture);
            await Resib.createStore('sampleStore');
            const { id, name } = await Resib.getStore(1);
            expect(id).eq(1n);
            expect(name).eq('sampleStore');
        });
        it('should be able to update stores', async () => {
            const { Resib } = await loadFixture(deployFixture);
            await Resib.createStore('sampleStore');
            await Resib.updateStore(1, 'newStore');
            const { name } = await Resib.getStore(1);
            expect(name).eq('newStore');
        });
        it('should be able to delete stores', async () => {
            const { Resib } = await loadFixture(deployFixture);
            await Resib.createStore('sampleStore');
            await Resib.deleteStore(1);
            const { id, name, owner } = await Resib.getStore(1);
            expect(id).eq(0n);
            expect(name).eq('');
            expect(owner).eq('0x0000000000000000000000000000000000000000');
        });
    });
    describe('Product', () => {
        it('should be able to create and get products', async () => {
            const { Resib } = await loadFixture(deployFixture);
            await Resib.createStore('sampleStore');
            await Resib.createProduct('sampleProduct', 1, 21);
            const { id, name, storeId, warrantyPeriod } = await Resib.getProduct(1);
            expect(id).eq(1n);
            expect(name).eq('sampleProduct');
            expect(storeId).eq(1n);
            expect(warrantyPeriod).eq(21n);
        });
        it('should be able to update products', async () => {
            const { Resib } = await loadFixture(deployFixture);
            await Resib.createStore('sampleStore');
            await Resib.createProduct('sampleProduct', 1, 21);
            await Resib.updateProduct(1, 'newProduct', 25);
            const { id, name, storeId, warrantyPeriod } = await Resib.getProduct(1);
            expect(id).eq(1n);
            expect(name).eq('newProduct');
            expect(storeId).eq(1n);
            expect(warrantyPeriod).eq(25n);
        });
        it('should be able to delete products', async () => {
            const { Resib } = await loadFixture(deployFixture);
            await Resib.createStore('sampleStore');
            await Resib.createProduct('sampleProduct', 1, 21);
            await Resib.deleteProduct(1);
            const { id, name, storeId, warrantyPeriod } = await Resib.getProduct(1);
            expect(id).eq(0n);
            expect(name).eq('');
            expect(storeId).eq(0n);
            expect(warrantyPeriod).eq(0n);
        });
    });
    describe('Warranty', () => {
        it('should be able to create and get warranties', async () => {
            const { Resib, owner } = await loadFixture(deployFixture);
            await Resib.createStore('sampleStore');
            await Resib.createProduct('sampleProduct', 1, 21);
            await Resib.createWarranty(1, owner);
            const { id, productId, customer } = await Resib.getWarranty(1);
            expect(id).eq(1n);
            expect(productId).eq(1n);
            expect(customer).eq(owner);
        });
        it('should be able to update warranties', async () => {
            const { Resib, owner } = await loadFixture(deployFixture);
            await Resib.createStore('sampleStore');
            await Resib.createProduct('sampleProduct', 1, 21);
            await Resib.createWarranty(1, owner);
            await Resib.updateWarranty(1, 500, 1000);
            const { id, startDate, endDate } = await Resib.getWarranty(1);
            expect(id).eq(1n);
            expect(startDate).eq(500n);
            expect(endDate).eq(1000n);
        });
        it('should be able to delete warranties', async () => {
            const { Resib, owner } = await loadFixture(deployFixture);
            await Resib.createStore('sampleStore');
            await Resib.createProduct('sampleProduct', 1, 21);
            await Resib.createWarranty(1, owner);
            await Resib.deleteWarranty(1);
            const { id, productId, customer, startDate, endDate } = await Resib.getWarranty(1);
            expect(id).eq(0n);
            expect(productId).eq(0n);
            expect(customer).eq('0x0000000000000000000000000000000000000000');
            expect(startDate).eq(0n);
            expect(endDate).eq(0n);
        });
    });
});
