import config from '../../public/config.json'

export default {
  async getTrendingTopics () {
    const { host, key } = config.api.bingCognitive
    const response = await fetch(
      `https://${host}/bing/v7.0/news/trendingtopics`,
      { headers: { 'Ocp-Apim-Subscription-Key': key } })
    const payload = await response.json()
    return payload.value
  },

  async getRecentNews (topic) {
    const { host, key } = config.api.bingCognitive
    const response = await fetch(
      `https://${host}/bing/v7.0/news?category=${topic}&freshness=Day`,
      { headers: { 'Ocp-Apim-Subscription-Key': key } })
    const payload = await response.json()
    return payload.value
  },
}
