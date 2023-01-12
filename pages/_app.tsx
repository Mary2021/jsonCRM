import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import React, { useEffect } from 'react'
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import theme from '../styles/theme'
import { Slide, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { SWRConfig } from 'swr'
import Layout from '../components/layout'

export default function App({ Component, pageProps }: AppProps) {

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');

    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  // Use the layout defined at the page level, if available
  // @ts-ignore
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  // render data
  return (
    <>
      <Head>
        <title>ZCRM</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          {/* Write a fetcher function to wrap the native fetch function and return the result of a call to url in json 
          format */}
          <SWRConfig
            value={{
              fetcher: (resource, url) =>
                fetch(resource, url).then((res) => res.json()),
            }}
          >
            {getLayout(<Component {...pageProps} />)}
          </SWRConfig>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            transition={Slide}
            hideProgressBar
          />
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  );
}