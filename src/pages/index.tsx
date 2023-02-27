import { Layout } from "antd";
import { NextPage } from "next";
import Head from "next/head";

import { Content, HeaderPage } from "../components/elements/";

const MainPage: NextPage = () => {
    return (
        <Layout className="layout">
            <Head>
                <title>Move My Wallet</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />

                <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />
                <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
                <link rel="icon" type="image/png" sizes="32x32" href="%PUBLIC_URL%/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="%PUBLIC_URL%/favicon-16x16.png" />
                <link rel="apple-touch-icon" href="%PUBLIC_URL%/apple-touch-icon.png" />
            </Head>

            <HeaderPage />

            <div className="content">
                <Content />
            </div>
        </Layout>
    );
};

export default MainPage;
