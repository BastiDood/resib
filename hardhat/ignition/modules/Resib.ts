import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';
export default buildModule('ResibModule', m => ({ resib: m.contract('Resib', []) }));
