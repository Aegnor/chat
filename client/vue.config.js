module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "@/assets/styles/mixin/media.scss";`
            }
        }
    }
}
