/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    pageExtensions: ['ts', 'tsx', 'mdx'],
    env: {
        API_DOMAIN: process.env.API_DOMAIN,
        OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    },
    reactStrictMode: false,
}

module.exports = nextConfig
