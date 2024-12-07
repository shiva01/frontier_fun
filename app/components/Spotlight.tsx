import React from 'react';
import { KeyInfo } from "../config/dataStructure";

export function Spotlight({ keyInfos } : { keyInfos : KeyInfo[] }) {
  return (
    <div style={styles.board}>
      <h3 style={{ ...styles.title, borderBottom: '2px solid transparent', paddingBottom: '10px' }}>SpotLight</h3>
      <table style={styles.table}>
        <tbody>
          {keyInfos.map((keyInfo) => (
            <tr key={keyInfo.name}>
              <td style = {{ ...styles.td, width: '60%' }}><a target="_blank" href={keyInfo.url} style={{ color: 'black' }}>{keyInfo.name}</a></td>
              <td style = {{ ...styles.td, width: '40%' }}>{keyInfo.remark}</td>
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
    textAlign: 'left',
  },
  td: {
    padding: '10px',
    paddingRight: '10px',
  },
};