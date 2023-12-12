/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  images: {
    domains: [
      'assets.coingecko.com',
      'images.cointelegraph.com',
      'www.coindesk.com',
    ],
  },
  env: {
    NEWS_API_KEY: process.env.NEWS_API_KEY
  },
  reactStrictMode: false,
}

module.exports = nextConfig