import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Navbar from '../components/Navbar';
import '../styles/globals.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [ isSSR, setIsSSR ] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if(isSSR) return null;
  
  return (
    <GoogleOAuthProvider clientId={ `${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}` }>
      <div className="xl:w-full m-auto min-h-[100vh] bg-[#18191A]">
        <Navbar/>
          <div className="flex flex-col">
            <Component {...pageProps} />
          </div>
      </div>
    </GoogleOAuthProvider>
  )
}

export default MyApp
