import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';
import { parseEther } from 'viem';

const JAN_1ST_2030 = 1893456000;
const ONE_GWEI = parseEther('0.001');

export default buildModule('ResibModule', m => {
    const unlockTime = m.getParameter('unlockTime', JAN_1ST_2030);
    const lockedAmount = m.getParameter('lockedAmount', ONE_GWEI);
    return { lock: m.contract('Resib', [unlockTime], { value: lockedAmount }) };
});
