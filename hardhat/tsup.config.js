import { defineConfig } from 'tsup';
export default defineConfig({
    tsconfig: 'tsconfig.json',
    entry: ['typechain-types/index.ts'],
    format: 'esm',
    dts: true,
    sourcemap: true,
    clean: true,
});
