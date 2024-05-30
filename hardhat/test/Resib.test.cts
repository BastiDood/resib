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
            const { Resib, owner } = await loadFixture(deployFixture);
            const Owner = Resib.connect(owner);
            await expect(Owner.createStore('sampleStore')).to.emit(Owner, 'StoreCreated').withArgs(0n);

            const { id, name } = await Owner.getStore(0);
            expect(id).eq(0n);
            expect(name).eq('sampleStore');
        });
    });
    describe('Product', () => {
        it('should be able to create and get products', async () => {
            const { Resib, owner } = await loadFixture(deployFixture);
            const Owner = Resib.connect(owner);
            await Owner.createStore('sampleStore');

            await expect(Owner.createProduct('sampleProduct', 0, 21))
                .to.emit(Owner, 'ProductCreated')
                .withArgs(0n);

            const { id, name, storeId, warrantyPeriod } = await Owner.getProduct(0);
            expect(id).eq(0n);
            expect(name).eq('sampleProduct');
            expect(storeId).eq(0n);
            expect(warrantyPeriod).eq(21n);
        });
    });
    describe('Warranty', () => {
        it('should be able to create and get warranties', async () => {
            const { Resib, owner } = await loadFixture(deployFixture);
            const Owner = Resib.connect(owner);
            await Resib.createStore('sampleStore');
            await Resib.createProduct('sampleProduct', 0, 21);

            // TODO: See if startDate and endDate can be emitted and tested
            await expect(Owner.createWarranty(0, owner)).to.emit(Owner, 'WarrantyCreated').withArgs(0n);

            await Resib.createWarranty(0, owner);
            const { id, productId, customer } = await Resib.getWarranty(0);
            expect(id).eq(0n);
            expect(productId).eq(0n);
            expect(customer).eq(owner);
        });
    });
});
