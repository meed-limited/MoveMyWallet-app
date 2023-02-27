/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cloudflare-ipfs.com",
                port: "",
            },
            {
                protocol: "https",
                hostname: "ipfs.moralis.io:2053",
                port: "",
            },
        ],
    },
    env: {
        MONGODB_COLLECTION: process.env.MONGODB_COLLECTION,
        MONGODB_COLLECTION_TEST: process.env.MONGODB_COLLECTION_TEST,
    },
};

module.exports = nextConfig;
