'use client';

import Link from "next/link";
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Homepage() {
    return (
      <div>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', backgroundColor: '#007bff', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <div style={{ margin: '10px 0' }}>
              <Link 
                href="/bio" 
                style={{ margin: '0 20px', color: '#fff', textDecoration: 'none', fontSize: '18px', fontWeight: 'bold', transition: 'color 0.3s' }} 
                onMouseOver={(e) => e.currentTarget.style.color = '#d1e7dd'} 
                onMouseOut={(e) => e.currentTarget.style.color = '#fff'}
              >
                BIO
              </Link>
              <Link 
                href="/ai" 
                style={{ margin: '0 20px', color: '#fff', textDecoration: 'none', fontSize: '18px', fontWeight: 'bold', transition: 'color 0.3s' }} 
                onMouseOver={(e) => e.currentTarget.style.color = '#d1e7dd'} 
                onMouseOut={(e) => e.currentTarget.style.color = '#fff'}
              >
                AI
              </Link>
              <Link 
                href="/zk" 
                style={{ margin: '0 20px', color: '#fff', textDecoration: 'none', fontSize: '18px', fontWeight: 'bold', transition: 'color 0.3s' }} 
                onMouseOver={(e) => e.currentTarget.style.color = '#d1e7dd'} 
                onMouseOut={(e) => e.currentTarget.style.color = '#fff'}
              >
                ZK
              </Link>
            </div>
          </div>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <h1 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', letterSpacing: '1px', color: '#fff', whiteSpace: 'nowrap' }}>
              Memes may fade, but science endures
            </h1>
          </div>
          <div style={{ flex: 1, textAlign: 'right' }}>
            <button 
              style={{ padding: '10px 25px', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '14px', transition: 'background-color 0.3s' }} 
            >
              <ConnectButton />
            </button>
          </div>
        </nav>
      </div>
    );
}