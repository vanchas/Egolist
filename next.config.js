// const withPWA = require('next-pwa')
const withImages = require('next-images')
// const withOffline = require('next-offline')
// const runtimeCaching = require('next-pwa/cache')

const nextConfig = {
    // pwa: {
    //     runtimeCaching,
    //     dest: 'public'
    // }
}

module.exports = withImages(nextConfig)
