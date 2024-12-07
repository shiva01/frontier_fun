import React from 'react';
import { Token } from "../config/dataStructure";

export function DataBoard({ tokenList } : { tokenList : Token[] }) {
  return (
    <div style={styles.board}>
      <h3 style={styles.title}>Key Projects</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style = {{ ...styles.th, width: '20%' }}>Token</th>
            <th style = {{ ...styles.th, width: '25%' }}>Type</th>
            <th style = {{ ...styles.th, width: '25%' }}>Price</th>
            <th style = {{ ...styles.th, width: '25%' }}>Market Value</th>
          </tr>
        </thead>
        <tbody>
          {tokenList.map((token) => (
            <tr key={token.token}>
              <td style = {styles.td}>{token.token}</td>
              <td style = {styles.td}><a target="_blank" href={token.url} style={{ color: 'black' }}>{token.type}</a></td>
              <td style = {styles.td}>{token.price}</td>
              <td style = {styles.td}>{token.marketValue}</td>
            </tr>
          ))}
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