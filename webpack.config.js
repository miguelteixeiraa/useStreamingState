module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: './index.ts',
    output: {
        filename: 'useStreamingState.js'
    },
    resolve: {
        extensions: ['.ts', 'js']
    },
    module: {
        rules: [{ test: /\.ts?$/, loader: 'ts-loader' }]
    }
}
