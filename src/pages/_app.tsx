import React, { useEffect, useState } from "react";

import type { AppProps } from "next/app";
import NextHead from "next/head";
import { WagmiConfig } from "wagmi";

import { UserDataProvider } from "../context/UserContextProvider";
import { client } from "../wagmi";
import "../styles/globals.css";

function App({ Component, pageProps }: AppProps) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    return (
        <WagmiConfig client={client}>
            <UserDataProvider>
                <NextHead>
                    <title>Move My wallet</title>
                </NextHead>
                <div style={{ fontFamily: "Sora, sans-serif" }}>{mounted && <Component {...pageProps} />}</div>
            </UserDataProvider>
        </WagmiConfig>
    );
}

export default App;
