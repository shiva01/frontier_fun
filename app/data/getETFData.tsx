import puppeteer from 'puppeteer';

interface ETHETFData {
  date: string;
  netFlow: number;
}

async function getETFData(): Promise<ETHETFData[]> {
  try {
    const browser = await puppeteer.launch({
      headless: true,
    });

    const page = await browser.newPage();
    
    await page.setViewport({ width: 1920, height: 1080 });
    
    // 使用ETH ETF的URL
    await page.goto('https://www.coinglass.com/zh/eth-etf', {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    await page.waitForSelector('table', { timeout: 30000 });

    const ethData = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('table tr'));
      return rows.slice(1).map(row => {
        const cells = Array.from(row.querySelectorAll('td'));
        const lastCell = cells[cells.length - 1];
        const flowText = lastCell?.textContent?.trim() || '0';
        
        // 处理"万"单位的数值
        let netFlow = 0;
        if (flowText.includes('万')) {
          netFlow = parseFloat(flowText.replace('+', '').replace('万', '')) * 10000;
        } else {
          netFlow = parseFloat(flowText.replace('+', '') || '0');
        }

        return {
          date: cells[0]?.textContent?.trim() || '',
          netFlow: netFlow,
        };
      }).filter(item => item.date !== '' && !isNaN(item.netFlow) && item.date !== '-');
    });

    await browser.close();
    return ethData;

  } catch (error) {
    console.error('爬取ETH ETF数据时发生错误:', error);
    throw error;
  }
}

export default getETFData;