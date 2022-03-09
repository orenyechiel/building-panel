export default {
    data() {
        return {
            showLoader: true,
        }
    },
    methods: {
        loaderOn() {
            this.showLoader = true
        },
        loaderOff() {
            this.showLoader = false
        },
    }
}