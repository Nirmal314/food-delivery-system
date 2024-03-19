/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        esmExternals: 'loose',
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            },
            {
                protocol: 'http',
                hostname: 'res.cloudinary.com'
            }
        ]
    },
    webpack: (config) => {
        config.resolve.fallback = { fs: false };

        return config;
    },

};

export default nextConfig;
