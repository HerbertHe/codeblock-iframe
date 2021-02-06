var path = require("path")

module.exports = {
    entry: "./src/index",
    mode: "production",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js",
        library: "__codeblock_iframe"
    },
    resolve: {
        extensions: [".ts", ".js"],
        fallback: {
            stream: require.resolve("stream-browserify"),
            buffer: require.resolve("buffer/"),
        },
    },
    module: {
        rules: [
            {
                // Include ts, tsx, js, and jsx files.
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
        ],
    },
}
