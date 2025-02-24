import "@rainbow-me/rainbowkit/styles.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0";
import {
  ChakraProvider,
  ColorModeProvider,
  theme,
  ThemeProvider,
} from "@chakra-ui/react";
import { myTheme } from "src/styles/theme";
import { useEffect, useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import type { DehydratedState } from "@tanstack/react-query";
import axios from "axios";
import {
  darkTheme,
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

axios.defaults.baseURL = process.env.AXIOS_URL_BASE;
function MyApp({
  Component,
  pageProps,
}: AppProps<{ dehydratedState: DehydratedState }>) {
  const queryClient = new QueryClient();
  const [showChild, setShowChild] = useState(false);
  const { chains, provider } = configureChains(
    [chain.goerli],
    [alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID })]
  );

  const { connectors } = getDefaultWallets({
    appName: "My RainbowKit App",
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  if (typeof window === "undefined") {
    return <></>;
  } else {
    return (
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          appInfo={{
            appName: "World Travelers",
          }}
          theme={{
            lightMode: lightTheme(),
            darkMode: darkTheme({
              accentColor: "#02b1b1",
            }),
          }}
          chains={chains}
          showRecentTransactions={true}
          coolMode
        >
          <ChakraProvider>
            <ThemeProvider theme={myTheme}>
              <QueryClientProvider client={queryClient}>
                <ColorModeProvider>
                  <UserProvider>
                    <Hydrate state={pageProps.dehydratedState}>
                      <Component {...pageProps} />
                    </Hydrate>
                    <ReactQueryDevtools />
                  </UserProvider>
                </ColorModeProvider>
              </QueryClientProvider>
            </ThemeProvider>
          </ChakraProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    );
  }
}

export default MyApp;
