'use client';

import Body from './components/Body';

export default function Home() {
    const bodyContent = Body("BIO"); 
    
    return (
        <>
            {bodyContent}
        </>
    );
}
