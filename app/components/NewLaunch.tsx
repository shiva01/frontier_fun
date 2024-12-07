'use client';

import React from 'react';
import { Project } from "../config/dataStructure";
import monitor from "../tools/monitor";
import { useState, useEffect } from 'react';

export function NewLaunch({ projectList } : { projectList : Project[] }) {
  const [isClicked, setIsClicked] = useState(false);

  async function main() {
    await monitor('https://catalyst.molecule.xyz/api/projects');
  }

  const handleClick = () => {
    setIsClicked(true);
  };

  useEffect(() => {
    if (isClicked) {
      main();
      setIsClicked(false);  // Reset state after the action
    }
  }, [isClicked]);

  return (
    <div style={styles.board}>
      <h3 style={styles.title}>New Launch&nbsp;&nbsp;      
        <button
          onClick={handleClick}
          style={buttonStyle}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
          onMouseDown={(e) => e.currentTarget.style.transform = buttonActiveStyle.transform}
          onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}>
          Monitor
        </button>
      </h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style = {{ ...styles.th, width: '20%' }}>Project</th>
            <th style = {{ ...styles.th, width: '20%' }}>Promotor</th>
            <th style = {{ ...styles.th, width: '20%' }}>Launch Time</th>
            <th style = {{ ...styles.th, width: '25%' }}>Remark</th>
            <th style = {{ ...styles.th, width: '20%' }}>Website</th>
          </tr>
        </thead>
        <tbody>
          {projectList.map((project) => (
            <tr key={project.projectName}>
              <td style = {styles.td}>{project.projectName}</td>
              <td style = {styles.td}>{project.promotor}</td>
              <td style = {styles.td}>{project.launchTime}</td>
              <td style = {styles.td}>{project.remark}</td>
              <td style = {styles.td}><a target="_blank" href={project.url} style={{ color: 'blue' }}>{project.website}</a></td>
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

const buttonStyle = {
  backgroundColor: '#007bff',
  color: 'white',
  padding: '10px 20px',
  fontSize: '16px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease, transform 0.2s ease',
};

const buttonHoverStyle = {
  ...buttonStyle,
  backgroundColor: '#0056b3',
};

const buttonActiveStyle = {
  ...buttonStyle,
  transform: 'scale(0.98)',
};