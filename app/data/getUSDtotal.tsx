import axios from 'axios';

interface CryptoData {
    symbol: string;
    quote: {
      USD: {
        market_cap: number;
      };
    };
}

async function getUSDtotal() {
  console.log("aaaaa");
  const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
      {
        headers: {
          'X-CMC_PRO_API_KEY': '888a1dd1-eaa2-4e14-8c46-63f726eea7b0',
        },
        params: {
          start: 1,
          limit: 20,
        }
      }
  );

  if (response && response.data.data) {
      const cryptoData = response.data.data;
      // look up for usdt & usdc
      const usdt = cryptoData.find((crypto: CryptoData) => crypto.symbol === 'USDT');
      const usdc = cryptoData.find((crypto: CryptoData) => crypto.symbol === 'USDC');
      const usdt_market_cap = usdt?.quote.USD.market_cap || 0;
      const usdc_market_cap = usdc?.quote.USD.market_cap || 0;
      console.log(usdt);
      console.log(usdc);
      return usdt_market_cap + usdc_market_cap;
  } 

  return 0;
}

export default getUSDtotal;