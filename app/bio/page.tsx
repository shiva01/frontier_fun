'use client';

import Body from '../components/Body';

export default function Bio() {
    const bodyContent = Body("BIO"); 
    
    return (
        <>
            {bodyContent}
        </>
    );
}