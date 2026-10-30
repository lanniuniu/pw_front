export default function ({ $axios, $config }, inject) {
    $axios.onRequest((config) => {
        config.params = config.params || {}
        return config
    })
}
