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
        config.resolve.fallback = { fs: false, tls: false };

        return config;
    },

    cookies: {
        pkceCodeVerifier: {
            name: "next-auth.pkce.code_verifier",
            options: {
                httpOnly: true,
                sameSite: "none",
                path: "/",
                secure: true,
            },
        },
    },
};

export default nextConfig;
