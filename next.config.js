/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // Ensure images from YouTube are allowed
    images: {
        domains: ['i.ytimg.com'],
    },
}

module.exports = nextConfig
