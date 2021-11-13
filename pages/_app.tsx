import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>建设中... | wsq.cool</title>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml"></link>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
