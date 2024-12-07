import { ethers, formatUnits } from "ethers";
import erc20ABI from '../config/erc20ABI';
import { provider } from '../config/rpcProvider';

async function getErc20Supply(chain, token) {
    // read from cache
    const CACHE_KEY_PREFIX = "tokenSupply_";
    const tokenSupplyLocal = localStorage.getItem(`${CACHE_KEY_PREFIX}${token}`);
    if (tokenSupplyLocal) {
        return tokenSupplyLocal;
    }

    // fetch from the chain
    const tokenContract = new ethers.Contract(token, erc20ABI, await provider(chain));
    const tokenSupplyRaw = await tokenContract.totalSupply();
    const tokenSupply = formatUnits(tokenSupplyRaw, 18);

    // write cache
    localStorage.setItem(`${CACHE_KEY_PREFIX}${token}`, tokenSupply);

    return tokenSupply;
}

export default getErc20Supply;