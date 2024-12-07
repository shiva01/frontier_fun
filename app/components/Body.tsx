'use client';

import { getTokenList, getProjectList, getKeyInfoList, getUsdTotal } from "../service/dataHandler";
import { DataBoard } from '../components/DataBoard';
import React, { useState, useEffect } from 'react';
import { Token, Project, KeyInfo } from "../config/dataStructure";
import { NewLaunch } from "../components/NewLaunch";
import { Spotlight } from "../components/Spotlight";
import { Tools } from "../components/Tools";
import { McroData } from "./McroData";

let tokenList: Token[];
let projectList: Project[];
let keyInfoList: KeyInfo[];
let usdTotal = 0;

export default function Body(category) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function main() {
      tokenList = await getTokenList(category);    
      projectList = await getProjectList(category);  
      keyInfoList = await getKeyInfoList(category);
      usdTotal = await getUsdTotal();
    }

    main().then(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <div style={styles.loader}>Loading...</div>
      ) : (
        <div style={styles.container}>
          {/* left part */}
          <div style={styles.left}>
            <DataBoard tokenList={tokenList} />
            <NewLaunch projectList={projectList}/>
            <Tools/>
          </div>
    
          {/* right part */}
          <div style={styles.right}>
            <McroData usdTotal={usdTotal}/>
            <Spotlight keyInfos={keyInfoList} />
          </div>
        </div>
      )}
    </>
  );      
}

const styles = {
  container: {
    display: 'flex', 
    height: '100vh', 
  },
  left: {
    flex: 3, 
    padding: '10px',
    borderRight: '1px solid #ddd', 
    display: 'flex',
    flexDirection: 'column', 
    gap: '10px', 
  },
  right: {
    flex: 1,
    padding: '10px',
    display: 'flex',
    flexDirection: 'column', 
    gap: '10px',
  },
  module: {
    background: '#f5f5f5',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
};
