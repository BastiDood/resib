import { assert } from 'chai';
import hre from 'hardhat';
import { time } from '@nomicfoundation/hardhat-toolbox-viem/network-helpers';

describe('Lock', () => {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployOneYearLockFixture() {
        const latest = await time.latest();
        const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
        const unlockTime = BigInt(latest + ONE_YEAR_IN_SECS);

        // Contracts are deployed using the first signer/account by default
        const [owner, otherAccount] = await hre.viem.getWalletClients();
        assert(typeof owner !== 'undefined');
        assert(typeof otherAccount !== 'undefined');

        const lockedAmount = 1n;
        const lock = await hre.viem.deployContract('Resib', [unlockTime], { value: lockedAmount });

        const publicClient = await hre.viem.getPublicClient();
        return { lock, unlockTime, lockedAmount, owner, otherAccount, publicClient };
    }
});
