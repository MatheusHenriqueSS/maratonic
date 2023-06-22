import React from 'react';
import { AppProps } from 'next/app';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }) {
  // Add your custom logic or components here

  return (
    <>
    <Component {...pageProps} />
    <ToastContainer/>   
    </>
  );

}

export default MyApp;
