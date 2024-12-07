import { FEE_RATE_MEDIUM, v3tokens } from '../config/tokenUniV3Config';
import v2tokens from '../config/tokenUniV2Config';
import solPairs from '../config/tokenRaydiumConfig';
import aeroTokens from '../config/tokenAeroConfig';
import getUniV3Price from '../data/getUniV3Price';
import getUniV2Price from '../data/getUniV2Price';
import getErc20Supply from '../data/getErc20Supply';
import getRaydiumPrice from '../data/getRaydiumPrice';
import getAeroPrice from '../data/getAeroPrice';
import { Token, Project, KeyInfo } from "../config/dataStructure";
import projects from '../config/projects';
import keyInfos from '../config/keyInfos';
import getUSDtotal from '../data/getUSDtotal';
import getETFData  from '../data/getETFData';

type GroupKey = "BIO" | "AI" | "ZK";
const tokenList: Record<GroupKey, Token[]>  = {
    "BIO": [],
    "AI": [],
    "ZK": []
};
const projectList: Record<GroupKey, Project[]> = {
    "BIO": [],
    "AI": [],
    "ZK": []
};
const keyInfoList: Record<GroupKey, KeyInfo[]> = {
    "BIO": [],
    "AI": [],
    "ZK": []
};

let isDataLoaded = false;
let usdTotal = 0;

function getPriceUnit(chain: string, priceUnit: string) {
    if (chain == "ETH" && priceUnit =="ETH")
        return "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
    else if (chain == "BASE" && priceUnit == "ETH") 
        return "0x4200000000000000000000000000000000000006";
    else if (chain == "BASE" && priceUnit == "USDC") 
        return "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
    return "";
}


async function dataHandler() {
    // token addresses
    const ETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
    const USDT = "0xdAC17F958D2ee523a2206206994597C13D831ec7";

    const priceETHUSDT = await getUniV3Price("ETH", ETH, USDT, FEE_RATE_MEDIUM) * Math.pow(10, 12); 
    const { price: priceSOLUSDC } = await getRaydiumPrice("8sLbNZoA1cfnvMJLPfp98ZLAnFSYCFApfJKMbiXNLwxj");
    function addToken(category: GroupKey, token: string, type: string, url: string, price: number, tokenSupply: number)
    {
        const marketValue = price * tokenSupply;
        tokenList[category].push({
            token: token,
            type: type,
            url: url,
            price : price.toFixed(6),
            marketValue : Math.floor(marketValue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        });
    }

    /* handle Uni V3 tokens */
    for (const token of Object.keys(v3tokens)) {
        const tokenInfo = v3tokens[token as keyof typeof v3tokens];
        const priceUnit = getPriceUnit(tokenInfo.chain, tokenInfo.priceUnit);
        const tokenPriceRaw = await getUniV3Price(tokenInfo.chain, tokenInfo.address, priceUnit, tokenInfo.poolFee);
        let price = 0;
        if (tokenInfo.priceUnit == "ETH")
            price = priceETHUSDT * tokenPriceRaw;
        else if (tokenInfo.priceUnit == "USDC")
            price = tokenPriceRaw * Math.pow(10, 12);
        const tokenSupply = Number(await getErc20Supply(tokenInfo.chain, tokenInfo.address));
        addToken(tokenInfo.category, token, tokenInfo.type, tokenInfo.url, price, tokenSupply);
    } 

    /* handle Uni V2 tokens */
    for (const token of Object.keys(v2tokens)) {
        const tokenInfo = v2tokens[token as keyof typeof v2tokens];
        const priceUnit = getPriceUnit(tokenInfo.chain, tokenInfo.priceUnit);
        const tokenPriceRaw = await getUniV2Price(tokenInfo.chain, tokenInfo.address, priceUnit);
        let price = 0;
        if (tokenInfo.priceUnit == "ETH")
            price = priceETHUSDT * tokenPriceRaw;
        else if (tokenInfo.priceUnit == "USDC")
            price = tokenPriceRaw * Math.pow(10, 12);
        const tokenSupply =  Number(await getErc20Supply(tokenInfo.chain, tokenInfo.address));
        addToken(tokenInfo.category, token, tokenInfo.type, tokenInfo.url, price, tokenSupply);
    }

    /* handle Aero tokens */
    for (const token of Object.keys(aeroTokens)) {
        const tokenInfo = aeroTokens[token as keyof typeof aeroTokens];
        const tokenPriceRaw = await getAeroPrice(tokenInfo.chain, tokenInfo.address, "0x4200000000000000000000000000000000000006");
        const price = priceETHUSDT * tokenPriceRaw;
        const tokenSupply = Number(await getErc20Supply(tokenInfo.chain, tokenInfo.address));
        addToken(tokenInfo.category, token, tokenInfo.type, tokenInfo.url, price, tokenSupply);
    } 
 
    /* handle Raydium tokens */
    for (const pair of Object.keys(solPairs)) {
        const pairInfo = solPairs[pair as keyof typeof solPairs];
        const { price: tokenPriceSOL, tokenSupply: tokenSupply } = await getRaydiumPrice(pairInfo.address);
        const price = priceSOLUSDC / tokenPriceSOL;
        addToken(pairInfo.category, pair, pairInfo.type, pairInfo.url, price, Number(tokenSupply));
    }

    for (const project of projects) {
        const { category, ...rest } = project;
        projectList[category].push(rest);
    }

    for (const keyInfo of keyInfos) {
        const { category, ...rest } = keyInfo;
        keyInfoList[category].push(rest);
    }

    // get the total amount of USDT & USDC
    usdTotal = await getUSDtotal();

    //getETFData();

    isDataLoaded = true;
}

(async () => {
    await dataHandler(); 
})();

export const getUsdTotal = async () => {
    while (!isDataLoaded) { 
        await new Promise(resolve => setTimeout(resolve, 100)); 
    }
    return Math.floor(usdTotal).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); 
};

export const getTokenList = async (category: GroupKey) => {
    while (!isDataLoaded) { 
        await new Promise(resolve => setTimeout(resolve, 100)); 
    }
    return tokenList[category]; 
};

export const getProjectList = async (category: GroupKey) => {
    while (!isDataLoaded) { 
        await new Promise(resolve => setTimeout(resolve, 100)); 
    }
    return projectList[category]; 
};

export const getKeyInfoList = async (category: GroupKey) => {
    while (!isDataLoaded) { 
        await new Promise(resolve => setTimeout(resolve, 100)); 
    }
    return keyInfoList[category]; 
};