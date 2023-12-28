module.exports = {
    presets: [
        ['@babel/preset-env', {
            targets: {
                node: '20.9.0' // node version
            },
        }]
    ],
    "plugins": ["@babel/plugin-syntax-dynamic-import"]
}