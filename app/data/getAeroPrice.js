import { ethers, formatUnits } from "ethers";
import uniswapV2poolABI from '../config/uniswapV2poolABI'; 
import { provider } from '../config/rpcProvider';

async function getAeroPrice(chain, token0, token1) {
    const factoryAddress = "0x420DD381b31aEf6683db6B902084cB0FFECe40Da";
    const factoryABI = [
        "function getPool(address tokenA, address tokenB, bool stable) external view returns (address)"
    ];
    const factoryContract = new ethers.Contract(factoryAddress, factoryABI, await provider(chain));
    const pairAddress = await factoryContract.getPool(token0, token1, false);

    const pairContract = new ethers.Contract(pairAddress, uniswapV2poolABI, await provider(chain));
    const reserves = await pairContract.getReserves();
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

export default getAeroPrice;
