/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig


//https://github.com/uiwjs/react-md-editor#support-nextjs
const removeImports = require('next-remove-imports')();
module.exports = removeImports({});