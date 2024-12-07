import { ethers } from "ethers";
import IUniswapV3PoolABI from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json'
import { provider } from '../config/rpcProvider';

const calculatePrice = (sqrtPriceX96) => {
    const numerator = BigInt(sqrtPriceX96) * BigInt(sqrtPriceX96);
    const denominator = BigInt(2) ** BigInt(192); // 2^(96*2)
    return Number(numerator) / Number(denominator);
};

async function getUniV3Price(chain, token0, token1, fee) {
    const CACHE_KEY_PREFIX = "poolAddress_";
    let poolAddress = localStorage.getItem(`${CACHE_KEY_PREFIX}${token0}${token1}${fee}`);
    if (!poolAddress) try {
        let factoryAddress = "";
        if (chain == "ETH") {
            factoryAddress = "0x1F98431c8aD98523631AE4a59f267346ea31F984";
        } else if (chain == "BASE") {
            factoryAddress = "0x33128a8fC17869897dcE68Ed026d694621f6FDfD";
        }
        const factoryABI = [
            "function getPool(address tokenA, address tokenB, uint24 fee) external view returns (address)"
        ];
        // construct Uni V3 factory contract
        const factoryContract = new ethers.Contract(factoryAddress, factoryABI, await provider(chain));
        poolAddress = await factoryContract.getPool(token0, token1, fee);
        localStorage.setItem(`${CACHE_KEY_PREFIX}${token0}${token1}${fee}`, poolAddress);
    } catch (error) {
        console.error('Error', error);
    }
    // construct pool contract
    const poolContract = new ethers.Contract(poolAddress, IUniswapV3PoolABI.abi, await provider(chain));
    // invoke slot0() to get sqrtPriceX96
    const { sqrtPriceX96 } = await poolContract.slot0();
    // calculatePrice
    const price = calculatePrice(sqrtPriceX96);
    new Promise(resolve => setTimeout(resolve, 10000));
    
    return price;
}

export default getUniV3Price;
