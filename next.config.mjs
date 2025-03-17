/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GROQ_API_KEY: process.env.GROQ_API_KEY,
    RAPIDAPIKEY: process.env.RAPIDAPIKEY,
  },
};

export default nextConfig;
