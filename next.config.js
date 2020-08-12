const withPWA = require('next-pwa')
const withImages = require('next-images')
const runtimeCaching = require('next-pwa/cache')

module.exports = withImages({
    pwa: {
        runtimeCaching,
        dest: 'public'
    }
})
