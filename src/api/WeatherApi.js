import config from '../../public/config.json'

export default {
  async getWeatherData () {
    const c = config.api.openweathermap
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${c.zipcode}&appid=${c.appid}&units=${c.units}`
    const response = await fetch(url)
    return await response.json()
  },
}
