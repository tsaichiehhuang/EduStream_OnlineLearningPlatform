/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    pageExtensions: ['ts', 'tsx', 'mdx'],
    env: {
        API_DOMAIN: process.env.API_DOMAIN,
    },
    reactStrictMode: false,
}

module.exports = nextConfig
