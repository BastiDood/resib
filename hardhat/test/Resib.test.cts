import '@nomicfoundation/hardhat-toolbox';
import { assert, expect } from 'chai';
import type { EventLog } from 'ethers';
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
        it('should be able to create stores', async () => {
            const { Resib, owner } = await loadFixture(deployFixture);
            const Owner = Resib.connect(owner);
            await expect(Owner.createStore('Sample Store 0')).emit(Owner, 'StoreCreated').withArgs(0n);
            await expect(Owner.createStore('Sample Store 1')).emit(Owner, 'StoreCreated').withArgs(1n);
            await expect(Owner.createStore('Sample Store 2')).emit(Owner, 'StoreCreated').withArgs(2n);
        });
    });
    describe('Product', () => {
        it('should be able to create products', async () => {
            const { Resib, owner } = await loadFixture(deployFixture);
            const Owner = Resib.connect(owner);
            await expect(Owner.createStore('Sample Store')).emit(Owner, 'StoreCreated').withArgs(0n);
            await expect(Owner.createProduct(0n, 'Sample Product 0', 21n)).emit(Owner, 'ProductCreated').withArgs(0n, 0n);
            await expect(Owner.createProduct(0n, 'Sample Product 1', 21n)).emit(Owner, 'ProductCreated').withArgs(0n, 1n);
            await expect(Owner.createProduct(0n, 'Sample Product 2', 21n)).emit(Owner, 'ProductCreated').withArgs(0n, 2n);
        });
    });
    describe('Warranty', () => {
        it('should be able to create', async () => {
            const { Resib, owner } = await loadFixture(deployFixture);
            const Owner = Resib.connect(owner);
            await expect(Owner.createStore('Sample Store')).emit(Owner, 'StoreCreated').withArgs(0n);
            await expect(Owner.createProduct(0n, 'Sample Product', 21n)).emit(Owner, 'ProductCreated').withArgs(0n, 0n);
            await expect(Owner.createWarranty(0, owner)).emit(Owner, 'WarrantyCreated').withArgs(0n, 0n, 0n);
            await expect(Owner.createWarranty(0, owner)).emit(Owner, 'WarrantyCreated').withArgs(0n, 0n, 1n);
            await expect(Owner.createWarranty(0, owner)).emit(Owner, 'WarrantyCreated').withArgs(0n, 0n, 2n);
        });
    });
});
