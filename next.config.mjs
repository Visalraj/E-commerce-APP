/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: "/admin",
                destination: "/admin/dashboard/",
                permanent: true,
            },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "flowbite.com",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                pathname: "/**",
            },
        ],
    },
    experimental: {
        // image uploading.
        serverActions: {
            bodySizeLimit: "7mb",
        },
    },
};

export default nextConfig;
