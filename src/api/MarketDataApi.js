import config from '../../public/config.json'
import cache from './Cache'

export default {

  async getHistoricalQuotes (symbol, interval, range) {
    const url = `https://api.mirabeau-tech.com/yahoo/v8/finance/chart/${symbol}?interval=${interval}&range=${range}`
    const cachedPayload = cache.get(url)
    if (cachedPayload) {
      return cachedPayload.chart.result[0]
    }
    const response = await fetch(url)
    const payload = await response.json()
    cache.set(url, payload, 3600000 * 4)
    return payload.chart.result[0]
  },

  async getStockQuotes (symbols) {
    const url = `https://api.mirabeau-tech.com/yahoo/v7/finance/quote?symbols=${symbols.join()}`
    const response = await fetch(url)
    const payload = await response.json()
    const result = {}
    for (const quote of payload.quoteResponse.result) {
      result[quote.symbol] = quote
    }
    return result
  },

  async getForexQuote (fromCurrency, toCurrency) {
    const url = 'https://alpha-vantage.p.rapidapi.com/query' +
      `?function=CURRENCY_EXCHANGE_RATE&to_currency=${toCurrency}&from_currency=${fromCurrency}`
    const cachedPayload = cache.get(url)
    if (cachedPayload) {
      return cachedPayload['Realtime Currency Exchange Rate']
    }
    const headers = {
      'x-rapidapi-key': config.api.rapidapi.key,
    }
    const response = await fetch(url, { headers: headers })
    const payload = await response.json()
    cache.set(url, payload, 3600000)
    return payload['Realtime Currency Exchange Rate']
  },
}
