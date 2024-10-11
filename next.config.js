/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/jsonCRM",
  output: "export",  // <=== enables static exports
  reactStrictMode: true,
}

module.exports = nextConfig


//https://github.com/uiwjs/react-md-editor#support-nextjs
const removeImports = require('next-remove-imports')();
module.exports = removeImports({});