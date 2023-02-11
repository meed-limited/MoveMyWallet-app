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
            </Head>

            <HeaderPage />

            <div className="content">
                <Content />
            </div>
        </Layout>
    );
};

export default MainPage;
