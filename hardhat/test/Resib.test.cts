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
            const { id, name } = await Resib.getStore(0);
            expect(id).eq(0n);
            expect(name).eq('sampleStore');
        });
    });
    describe('Product', () => {
        it('should be able to create and get products', async () => {
            const { Resib } = await loadFixture(deployFixture);
            await Resib.createStore('sampleStore');
            await Resib.createProduct('sampleProduct', 0, 21);
            const { id, name, storeId, warrantyPeriod } = await Resib.getProduct(0);
            expect(id).eq(0n);
            expect(name).eq('sampleProduct');
            expect(storeId).eq(0n);
            expect(warrantyPeriod).eq(21n);
        });
    });
    describe('Warranty', () => {
        it('should be able to create and get warranties', async () => {
            const { Resib, owner } = await loadFixture(deployFixture);
            await Resib.createStore('sampleStore');
            await Resib.createProduct('sampleProduct', 0, 21);
            await Resib.createWarranty(0, owner);
            const { id, productId, customer } = await Resib.getWarranty(0);
            expect(id).eq(0n);
            expect(productId).eq(0n);
            expect(customer).eq(owner);
        });
    });
});
