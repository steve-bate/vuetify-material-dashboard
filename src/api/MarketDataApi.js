import config from '../../public/config.json'

export default {

  async getStockQuotes (symbols) {
    const url = `https://api.mirabeau-tech.com/yahoo/v7/finance/quote?symbols=${symbols.join()}`
    const response = await fetch(url)
    console.log(response)
    const data = await response.json()
    console.log('data', data)
    const result = {}
    for (const quote of data.quoteResponse.result) {
      result[quote.symbol] = quote
    }
    console.log(result)
    return result
  },

  async getForexQuote (fromCurrency, toCurrency) {
    const pair = `${fromCurrency}-${toCurrency}`
    const now = new Date()
    let cachedData = localStorage.getItem(pair)
    if (cachedData) {
      cachedData = JSON.parse(cachedData)
      console.log('cachedData', cachedData)
      const timestamp = new Date(cachedData.timestamp)
      console.log('timestamp', timestamp)
      if (now.getTime() - timestamp.getTime() > (3600 * 4 * 1000)) {
        console.log('cache timeout', pair)
      } else {
        console.log('using forex cache', pair, cachedData.data)
        return cachedData
      }
    }
    const url = 'https://alpha-vantage.p.rapidapi.com/query' +
      `?function=CURRENCY_EXCHANGE_RATE&to_currency=${toCurrency}&from_currency=${fromCurrency}`
    const headers = {
      'x-rapidapi-key': config.api.rapidapi.key,
    }
    console.log('getting forex', pair)
    const response = await fetch(url, { headers: headers })
    const payload = await response.json()
    console.log('payload', pair, payload)
    const data = {
      timestamp: now,
      data: payload['Realtime Currency Exchange Rate'],
    }
    localStorage.setItem(pair, JSON.stringify(data))
    console.log('data cached', pair)
    return data
  },
}
