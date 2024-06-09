import '@nomicfoundation/hardhat-toolbox';
import type { HardhatUserConfig } from 'hardhat/types';
import { config } from 'dotenv';

const { error } = config();
if (typeof error !== 'undefined') console.error(error);

const { WALLET_PRV_KEY } = process.env;
const accounts = WALLET_PRV_KEY ? [WALLET_PRV_KEY] : [];

export default {
    solidity: {
        version: '0.8.24',
        settings: { optimizer: { enabled: true, runs: 1000 } },
    },
    networks: {
        'arbitrum-sepolia': {
            url: 'https://arbitrum-sepolia.blockpi.network/v1/rpc/public',
            chainId: 421614,
            accounts,
        },
    },
    gasReporter: { enabled: true },
} satisfies HardhatUserConfig;
