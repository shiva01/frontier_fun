import axios from 'axios';

async function getTokenSupply(token) {
    // read from cache
    const CACHE_KEY_PREFIX = "tokenSupply_";
    const tokenSupplyLocal = localStorage.getItem(`${CACHE_KEY_PREFIX}${token}`);
    if (tokenSupplyLocal) {
        return tokenSupplyLocal;
    }

    // fetch from the chain 
    const url = 'https://side-restless-vineyard.solana-mainnet.quiknode.pro/ce5d318b8322e2fc172505424d2e802385d20a5b';
    const data = {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "getTokenSupply",
        "params": [
            token
        ]
    };
    try {
        const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const tokenSupply = response.data.result.value.uiAmount;

        // write cache
        localStorage.setItem(`${CACHE_KEY_PREFIX}${token}`, tokenSupply);

        return tokenSupply;
    } catch (error) {
        console.error('Error fetching token supply:', error);
    }
    return 0;
}

async function getRaydiumPrice(pair) {
    const poolUrl = `https://api-v3.raydium.io/pools/info/ids?ids=${pair}`;
    let price = 0;
    let tokenSupply = 0;
    try {
        const response = await fetch(poolUrl);
        const pool = await response.json();
        price = pool.data[0].price;
        // get total supply
        const tokenAddress = pool.data[0].mintB.address;
        tokenSupply = await  getTokenSupply(tokenAddress);
    } catch (error) {
        console.error('Error fetching price:', error);
    }
    return { price, tokenSupply };
}

export default getRaydiumPrice;