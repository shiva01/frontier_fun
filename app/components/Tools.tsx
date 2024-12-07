import React from 'react';

export function Tools() {
  return (
    <div style={styles.board}>
      <h3 style={styles.title}>Tools</h3>
      <table style={styles.table}>
        <tbody> 
          <tr>
            <td style = {styles.td}><a target="_blank" href="https://raydium.io/" style={{ color: 'black' }}>raydim dex,sol</a></td>
            <td style = {styles.td}><a target="_blank" href="https://aerodrome.finance/" style={{ color: 'black' }}>aerodrome dex,base</a></td>
            <td style = {styles.td}><a target="_blank" href="https://app.uniswap.org/" style={{ color: 'black' }}>uni lol</a></td>
          </tr>
          <tr>
            <td style = {styles.td}><a target="_blank" href="https://debank.com/" style={{ color: 'black' }}>debank farming data</a></td>
            <td style = {styles.td}><a target="_blank" href="https://farmer.meme/" style={{ color: 'black' }}>farmermeme farming discovery</a></td>
          </tr>
          <tr>
            <td style = {styles.td}><a target="_blank" href="https://solscan.io/" style={{ color: 'black' }}>sol explorer</a></td>
            <td style = {styles.td}><a target="_blank" href="https://base.blockscout.com/" style={{ color: 'black' }}>base explorer</a></td>
            <td style = {styles.td}><a target="_blank" href="therscan.io" style={{ color: 'black' }}>eth explorer</a></td>
          </tr>
          <tr>
            <td style = {styles.td}><a target="_blank" href="https://ave.ai/" style={{ color: 'black' }}>ave market</a></td>
            <td style = {styles.td}><a target="_blank" href="https://dexscreener.com/" style={{ color: 'black' }}>dexscreener market</a></td>
          </tr>
          <tr>
            <td style = {styles.td}><a target="_blank" href="https://www.0xscope.com/" style={{ color: 'black' }}>0xscope social data</a></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  board: {
    background: '#f5f5f5',
    lineHeight: '0.5',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    overflowX: 'auto', // 处理内容过宽时的滚动
  },
  title: {
    marginBottom: '10px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'right',
  },
  th: {
    //border: '1px solid #ccc',
    padding: '10px',
    paddingRight: '50px',
    backgroundColor: '#f0f0f0',
    fontWeight: 'normal',
  },
  td: {
    padding: '10px',
    paddingRight: '50px',
  },
};