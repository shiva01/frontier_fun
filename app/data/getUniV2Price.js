import { ChainId, Token } from '@uniswap/sdk-core';
import { Pair } from '@uniswap/v2-sdk';
import { ethers, formatUnits } from "ethers";
import uniswapV2poolABI from '../config/uniswapV2poolABI'; 
import { provider } from '../config/rpcProvider';

async function getUniV2Price(chain, token0, token1) {
    const Token0 = new Token(ChainId.MAINNET, token0, 18);
    const Token1 = new Token(ChainId.MAINNET, token1, 18);
    const pairAddress = Pair.getAddress(Token0, Token1);
    const pairContract = new ethers.Contract(pairAddress, uniswapV2poolABI, await provider(chain));
    const reserves = await pairContract["getReserves"]();
    const [reserveRaw0, reserveRaw1] = reserves;
    let reserve0 = 0;
    let reserve1 = 1;
    if (token0.toLowerCase() > token1.toLowerCase()) {
        reserve0 = formatUnits(reserveRaw0, 18); 
        reserve1 = formatUnits(reserveRaw1, 18);
    } else {
        reserve0 = formatUnits(reserveRaw1, 18); 
        reserve1 = formatUnits(reserveRaw0, 18);
    }
    const price = reserve0 / reserve1;
    return price;
}

export default getUniV2Price;
