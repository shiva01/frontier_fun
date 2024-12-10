'use client';

import Body from './components/Body';
import '@rainbow-me/rainbowkit/styles.css';
import { useAccount } from 'wagmi'
import { useEffect, useState, useRef } from 'react'

import ChatboxSDK from 'groupfi-chatbox-sdk'
import 'groupfi-chatbox-sdk/dist/esm/assets/style.css'


export default function Home() {
    const bodyContent = Body("BIO"); 
    const account = useAccount()
    const [isChatboxReady, setIsChatboxReady] = useState(false)
    const [walletProvider, setWalletProvider] = useState<
      undefined | null | unknown
    >(undefined)
    const isGettingWalletProvider = useRef(false)
  
    useEffect(() => {
      const handleChatboxReady = () => {
        setIsChatboxReady(true)
        console.log("handleChatboxReady rendered");
  
        ChatboxSDK.request({
          method: 'setGroups',
          params: {
            includes: [{ groupId: 'groupfiETHGlobalSingaporePack9ba9067c82621a028e3576b2ef2982588f096601a5180cb57962fe3d434a4c96' }]
          }
        })
      } 
  
      ChatboxSDK.events.on('chatbox-ready', handleChatboxReady)
  
      return () => {
        ChatboxSDK.events.off('chatbox-ready', handleChatboxReady)
      }
    }, [])
  
    // Try get wallet Provider from account connector
    useEffect(() => {
      const asyncTryGetWalletProvider = async () => {
        try {
          if (account.connector === undefined) {
            setWalletProvider(null)
          } else if (
            Object.hasOwnProperty.bind(account.connector)('getProvider')
          ) {
            isGettingWalletProvider.current = true
            const walletProvider = await account.connector?.getProvider()
            setWalletProvider(walletProvider)
            isGettingWalletProvider.current = false
          }
        } catch (error) {
          console.error('Failed to get wallet provider', error)
        }
      }
      asyncTryGetWalletProvider()
  
    }, [account.connector])
  
    // Call the loadChatbox api or the processWallet api based on the walletProvider
    useEffect(() => {
      if (walletProvider === undefined) {
        return
      }
  
      const isWalletConnected = walletProvider !== null
  
      // Call loadChatbox() to start
      if (!isChatboxReady) {
        ChatboxSDK.loadChatbox({
          isWalletConnected,
          provider: walletProvider ?? undefined
        })
      } else {
        // Call processWallet() when the status of wallet has changed
        ChatboxSDK.processWallet({
          isWalletConnected,
          provider: walletProvider ?? undefined
        })
      }
    
    }, [walletProvider, isChatboxReady])
  
    useEffect(() => {
      if (
        !isGettingWalletProvider.current &&
        walletProvider &&
        isChatboxReady &&
        account.address !== undefined
      ) {
        // specify the address for the chatbox to load.
        ChatboxSDK.processAccount({
          account: account.address
        })
      }
    
    }, [isChatboxReady, walletProvider, account.address])
  
    return (
        <>
            {bodyContent}
        </>
    );
}
