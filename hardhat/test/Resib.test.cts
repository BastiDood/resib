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
            await expect(Owner.createStore('Sample Store 0')).emit(Owner, 'StoreCreated').withArgs(0n);
            await expect(Owner.createStore('Sample Store 1')).emit(Owner, 'StoreCreated').withArgs(1n);
            await expect(Owner.createStore('Sample Store 2')).emit(Owner, 'StoreCreated').withArgs(2n);
            const [first, second, third, ...rest] = await Owner.getStores();
            assert(typeof first !== 'undefined');
            assert(typeof second !== 'undefined');
            assert(typeof third !== 'undefined');
            expect(rest).empty;
            expect(first.name).equals('Sample Store 0');
            expect(first.owner).equals(owner.address);
            expect(second.name).equals('Sample Store 1');
            expect(second.owner).equals(owner.address);
            expect(third.name).equals('Sample Store 2');
            expect(third.owner).equals(owner.address);
        });
    });
    describe('Product', () => {
        it('should be able to create and get products', async () => {
            const { Resib, owner } = await loadFixture(deployFixture);
            const Owner = Resib.connect(owner);
            await expect(Owner.createStore('Sample Store')).emit(Owner, 'StoreCreated').withArgs(0n);
            await expect(Owner.createProduct(0n, 'Sample Product 0', 20n)).emit(Owner, 'ProductCreated').withArgs(0n, 0n);
            await expect(Owner.createProduct(0n, 'Sample Product 1', 40n)).emit(Owner, 'ProductCreated').withArgs(0n, 1n);
            await expect(Owner.createProduct(0n, 'Sample Product 2', 10n)).emit(Owner, 'ProductCreated').withArgs(0n, 2n);
            await expect(Owner.createStore('Irrelevant Store')).emit(Owner, 'StoreCreated').withArgs(1n);
            await expect(Owner.createProduct(1n, 'Ignored Product 0', 1n)).emit(Owner, 'ProductCreated').withArgs(1n, 3n);
            const [first, second, third, ...rest] = await Owner.getProductsByStoreId(0n);
            assert(typeof first !== 'undefined');
            assert(typeof second !== 'undefined');
            assert(typeof third !== 'undefined');
            expect(rest).empty;
            expect(first.name).equals('Sample Product 0');
            expect(first.warrantyPeriod).equals(20n);
            expect(second.name).equals('Sample Product 1');
            expect(second.warrantyPeriod).equals(40n);
            expect(third.name).equals('Sample Product 2');
            expect(third.warrantyPeriod).equals(10n);
        });
    });
    describe('Warranty', () => {
        it('should be able to create and get warranties', async () => {
            const { Resib, owner } = await loadFixture(deployFixture);
            const Owner = Resib.connect(owner);
            await expect(Owner.createStore('Sample Store')).emit(Owner, 'StoreCreated').withArgs(0n);
            await expect(Owner.createProduct(0n, 'Sample Product', 21n)).emit(Owner, 'ProductCreated').withArgs(0n, 0n);
            await expect(Owner.createWarranty(0n, owner)).emit(Owner, 'WarrantyCreated').withArgs(0n, 0n, 0n);
            await expect(Owner.createWarranty(0n, owner)).emit(Owner, 'WarrantyCreated').withArgs(0n, 0n, 1n);
            await expect(Owner.createWarranty(0n, owner)).emit(Owner, 'WarrantyCreated').withArgs(0n, 0n, 2n);
            await expect(Owner.createStore('Irrelevant Store')).emit(Owner, 'StoreCreated').withArgs(1n);
            await expect(Owner.createProduct(1n, 'Ignored Product 0', 1n)).emit(Owner, 'ProductCreated').withArgs(1n, 1n);
            await expect(Owner.createWarranty(1n, owner)).emit(Owner, 'WarrantyCreated').withArgs(1n, 1n, 3n);
            const [first, second, third, ...rest] = await Owner.getWarrantiesByStoreId(0n);
            assert(typeof first !== 'undefined');
            assert(typeof second !== 'undefined');
            assert(typeof third !== 'undefined');
            expect(rest).empty;
            expect(first.warranty).equals(0n);
            expect(first.customer).equals(owner.address);
            expect(first.product).equals('Sample Product');
            expect(second.warranty).equals(1n);
            expect(second.customer).equals(owner.address);
            expect(second.product).equals('Sample Product');
            expect(third.warranty).equals(2n);
            expect(third.customer).equals(owner.address);
            expect(third.product).equals('Sample Product');
            // TODO: Test start dates and end dates.
        });
    });
});
