export function load({ params: { store } }) {
    return { storeId: parseInt(store, 10) };
}
