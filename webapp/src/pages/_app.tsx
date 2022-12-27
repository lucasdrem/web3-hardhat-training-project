import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Web3ReactProvider } from "@web3-react/core";
import {
  Web3Provider,
  JsonRpcFetchFunc,
  ExternalProvider,
} from "@ethersproject/providers";

export default function App({ Component, pageProps }: AppProps) {
  const getLibrary = (
    provider: ExternalProvider | JsonRpcFetchFunc
  ): Web3Provider => {
    const library = new Web3Provider(provider);
    return library;
  };

  return (
    <>
      <Head>
        <title>Dapp</title>
        <meta name="description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Web3ReactProvider getLibrary={getLibrary}>
        <Component {...pageProps} />
      </Web3ReactProvider>
    </>
  );
}
