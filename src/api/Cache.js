export default {
    get (key) {
        const item = localStorage.getItem(key)
        if (!item) {
            return
        }
        const data = JSON.parse(item)
        if ((new Date()).getTime() > data.expiresAt) {
            localStorage.removeItem(key)
            return undefined
        }
        return data.value
    },
    set (key, value, timeoutMillis = 0) {
        const expiresAt = new Date(new Date().getTime() + timeoutMillis).getTime()
        localStorage.setItem(key, JSON.stringify({ expiresAt, value }))
    },
}
