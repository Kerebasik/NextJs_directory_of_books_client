const path = require("node:path");
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
        prependData: `@import "variables.scss";`
    },
}

module.exports = nextConfig
