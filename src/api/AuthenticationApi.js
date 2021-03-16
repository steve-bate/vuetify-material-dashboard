import config from '../../public/config.json'

export default {
  async authenticate (credentials) {
    const response = await fetch(config.api.auth, {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const payload = await response.json()
    if (payload.token) {
      return payload.token
    }
    throw new Error(payload.message || 'Authentication failed')
  },
}
