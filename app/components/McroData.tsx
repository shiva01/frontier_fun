import React from 'react';

export function McroData({ usdTotal } : { usdTotal : string}) {
    return (
      <div style={styles.board}>
        <h3 style={{ ...styles.title, borderBottom: '2px solid transparent', paddingBottom: '10px' }}>Mcro Data</h3>
        <table style={styles.table}>
          <tbody>
            <tr>
              <td style = {{ ...styles.td, width: '60%' }}><a target="_blank" href="" style={{ color: 'black' }}>{usdTotal}</a></td>
              <td style = {{ ...styles.td, width: '40%' }}>USDC&T</td>
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
    overflowX: 'auto', 
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