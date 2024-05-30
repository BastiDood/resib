import { BrowserProvider } from 'ethers';
import { PUBLIC_RESIB_DEPLOYMENT } from '$env/static/public';
import { Resib__factory } from 'hardhat-resib';

const runner = typeof window.ethereum !== 'undefined' ? new BrowserProvider(window.ethereum) : null;
export default Resib__factory.connect(PUBLIC_RESIB_DEPLOYMENT, runner);
