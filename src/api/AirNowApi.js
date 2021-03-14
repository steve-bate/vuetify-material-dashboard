import config from '../../public/config.json'

export default {
  async getAirQuality () {
    const c = config.api.airnow
    const url = `https://www.airnowapi.org/aq/observation/zipCode/current/?format=application/json&distance=25&API_KEY=${c.key}&zipCode=${c.zipcode}`
    const response = await fetch(url)
    return await response.json()
  },
}
