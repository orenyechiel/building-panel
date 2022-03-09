module.exports = {
    devServer: {
        https: true,
    },
    css: {
        loaderOptions: {
            sass: {
                additionalData: `
                  @import "@/assets/style/general.scss";
                `
            }
        }
    }
}