/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com', // Allow Unsplash images
        port: '', // optional, leave empty if default port is used
        pathname: '/**', // allow all paths
      },
      {
        protocol: 'https',
        hostname: 'assets.aceternity.com', // Keep your other allowed domain
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'commondatastorage.googleapis.com', // Keep your other allowed domain
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
