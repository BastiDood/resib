import '@nomicfoundation/hardhat-toolbox';
import { assert, expect } from 'chai';
import { ethers } from 'hardhat';
import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers';

async function deployFixture() {
    const [owner, other] = await ethers.getSigners();
    assert(typeof owner !== 'undefined');
    assert(typeof other !== 'undefined');
    const factory = await ethers.getContractFactory('Resib');
    const Resib = await factory.deploy();
    await Resib.waitForDeployment();
    return { Resib, owner, other };
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
            await expect(Owner.createProduct(0n, 'Sample Product 0', 20n))
                .emit(Owner, 'ProductCreated')
                .withArgs(0n, 0n);
            await expect(Owner.createProduct(0n, 'Sample Product 1', 40n))
                .emit(Owner, 'ProductCreated')
                .withArgs(0n, 1n);
            await expect(Owner.createProduct(0n, 'Sample Product 2', 10n))
                .emit(Owner, 'ProductCreated')
                .withArgs(0n, 2n);

            await expect(Owner.createStore('Irrelevant Store')).emit(Owner, 'StoreCreated').withArgs(1n);
            await expect(Owner.createProduct(1n, 'Ignored Product 0', 1n))
                .emit(Owner, 'ProductCreated')
                .withArgs(1n, 3n);

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
            await expect(Owner.createProduct(0n, 'Sample Product', 21n))
                .emit(Owner, 'ProductCreated')
                .withArgs(0n, 0n);
            await expect(Owner.createWarranty(0n, owner)).emit(Owner, 'WarrantyCreated').withArgs(0n, 0n, 0n);
            await expect(Owner.createWarranty(0n, owner)).emit(Owner, 'WarrantyCreated').withArgs(0n, 0n, 1n);
            await expect(Owner.createWarranty(0n, owner)).emit(Owner, 'WarrantyCreated').withArgs(0n, 0n, 2n);

            await expect(Owner.createStore('Irrelevant Store')).emit(Owner, 'StoreCreated').withArgs(1n);
            await expect(Owner.createProduct(1n, 'Ignored Product 0', 1n))
                .emit(Owner, 'ProductCreated')
                .withArgs(1n, 1n);
            await expect(Owner.createWarranty(1n, owner)).emit(Owner, 'WarrantyCreated').withArgs(1n, 1n, 3n);

            const [first, second, third, ...rest] = await Owner.getWarrantiesByStoreId(0n);
            assert(typeof first !== 'undefined');
            assert(typeof second !== 'undefined');
            assert(typeof third !== 'undefined');
            expect(rest).empty;

            expect(first.warranty).equals(0n);
            expect(first.customer).equals(owner.address);
            expect(first.product).equals('Sample Product');
            expect(first.status).equals(1n);

            expect(second.warranty).equals(1n);
            expect(second.customer).equals(owner.address);
            expect(second.product).equals('Sample Product');
            expect(second.status).equals(1n);

            expect(third.warranty).equals(2n);
            expect(third.customer).equals(owner.address);
            expect(third.product).equals('Sample Product');
            expect(third.status).equals(1n);
            // TODO: Test start dates and end dates.
        });
        it('should be able to get own warranties', async () => {
            const { Resib, owner, other } = await loadFixture(deployFixture);
            const Owner = Resib.connect(owner);
            const Other = Resib.connect(other);

            await expect(Owner.createStore('Sample Store')).emit(Owner, 'StoreCreated').withArgs(0n);
            await expect(Owner.createProduct(0n, 'Sample Product', 21n))
                .emit(Owner, 'ProductCreated')
                .withArgs(0n, 0n);
            await expect(Owner.createWarranty(0n, owner)).emit(Owner, 'WarrantyCreated').withArgs(0n, 0n, 0n);
            await expect(Owner.createWarranty(0n, other)).emit(Owner, 'WarrantyCreated').withArgs(0n, 0n, 1n);

            const [ownerWarranty, ...ownerRest] = await Owner.getOwnedWarranties(owner);
            assert(typeof ownerWarranty !== 'undefined');
            expect(ownerRest).empty;
            expect(ownerWarranty.store).equals('Sample Store');
            expect(ownerWarranty.product).equals('Sample Product');

            const [otherWarranty, ...otherRest] = await Other.getOwnedWarranties(owner);
            assert(typeof otherWarranty !== 'undefined');
            expect(otherRest).empty;
            expect(otherWarranty.store).equals('Sample Store');
            expect(otherWarranty.product).equals('Sample Product');
            // TODO: Test start dates and end dates.
        });
        it('should be able to void warranties', async () => {
            const { Resib, owner } = await loadFixture(deployFixture);
            const Owner = Resib.connect(owner);

            await expect(Owner.createStore('Sample Store')).emit(Owner, 'StoreCreated').withArgs(0n);
            await expect(Owner.createProduct(0n, 'Sample Product', 21n))
                .emit(Owner, 'ProductCreated')
                .withArgs(0n, 0n);
            await expect(Owner.createWarranty(0n, owner)).emit(Owner, 'WarrantyCreated').withArgs(0n, 0n, 0n);

            {
                const [warranty, ...rest] = await Owner.getOwnedWarranties(owner);
                assert(typeof warranty !== 'undefined');
                expect(rest).empty;
                expect(warranty.status).equals(1n);
            }

            {
                await Owner.processWarrantyStatus(0n);
                const [warranty, ...rest] = await Owner.getOwnedWarranties(owner);
                assert(typeof warranty !== 'undefined');
                expect(rest).empty;
                expect(warranty.status).equals(2n);
            }

            {
                await Owner.resetWarrantyStatus(0n);
                const [warranty, ...rest] = await Owner.getOwnedWarranties(owner);
                assert(typeof warranty !== 'undefined');
                expect(rest).empty;
                expect(warranty.status).equals(1n);
            }

            {
                await Owner.voidWarrantyStatus(0n);
                const [warranty, ...rest] = await Owner.getOwnedWarranties(owner);
                assert(typeof warranty !== 'undefined');
                expect(rest).empty;
                expect(warranty.status).equals(0n);
            }

            // TODO: Test Error Path
        });
        it('should be able to avail warranties', async () => {
            const { Resib, owner } = await loadFixture(deployFixture);
            const Owner = Resib.connect(owner);

            await expect(Owner.createStore('Sample Store')).emit(Owner, 'StoreCreated').withArgs(0n);
            await expect(Owner.createProduct(0n, 'Sample Product', 21n))
                .emit(Owner, 'ProductCreated')
                .withArgs(0n, 0n);
            await expect(Owner.createWarranty(0n, owner)).emit(Owner, 'WarrantyCreated').withArgs(0n, 0n, 0n);

            {
                const [warranty, ...rest] = await Owner.getOwnedWarranties(owner);
                assert(typeof warranty !== 'undefined');
                expect(rest).empty;
                expect(warranty.status).equals(1n);
            }

            {
                await Owner.processWarrantyStatus(0n);
                const [warranty, ...rest] = await Owner.getOwnedWarranties(owner);
                assert(typeof warranty !== 'undefined');
                expect(rest).empty;
                expect(warranty.status).equals(2n);
            }

            {
                await Owner.resetWarrantyStatus(0n);
                const [warranty, ...rest] = await Owner.getOwnedWarranties(owner);
                assert(typeof warranty !== 'undefined');
                expect(rest).empty;
                expect(warranty.status).equals(1n);
            }

            {
                await Owner.processWarrantyStatus(0n);
                const [warranty, ...rest] = await Owner.getOwnedWarranties(owner);
                assert(typeof warranty !== 'undefined');
                expect(rest).empty;
                expect(warranty.status).equals(2n);
            }

            {
                await Owner.availWarrantyStatus(0n);
                const [warranty, ...rest] = await Owner.getOwnedWarranties(owner);
                assert(typeof warranty !== 'undefined');
                expect(rest).empty;
                expect(warranty.status).equals(3n);
            }
            // TODO: Test Error Path
        });
    });
});
