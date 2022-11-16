import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";

const desiredChainId = ChainId.Goerli;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      desiredChainId={desiredChainId}
      authConfig={{
        domain: "http://localhost:3000/",
        authUrl: "/api/auth",
      }}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
