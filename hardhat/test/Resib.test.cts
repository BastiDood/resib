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

});
