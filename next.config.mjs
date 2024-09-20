/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'assets.aceternity.com',
          port: '', // optional, only include if the domain uses a non-standard port
          pathname: '/**', // allow all paths from the hostname
        },
      ],
    },
  };
  
  export default nextConfig;
  