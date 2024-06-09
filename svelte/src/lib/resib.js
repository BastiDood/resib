import { BrowserProvider } from 'ethers';
import { PUBLIC_RESIB_DEPLOYMENT } from '$env/static/public';
import { Resib__factory } from 'hardhat-resib';
import { browser } from '$app/environment';

export const provider = browser && typeof window.ethereum !== 'undefined' ? new BrowserProvider(window.ethereum) : null;
export const resib = Resib__factory.connect(PUBLIC_RESIB_DEPLOYMENT, provider);
