export default {
  authenticate ({ username }) {
    return new Promise((resolve, reject) => {
      if (username === 'steve') {
        resolve('LOGIN_TOKEN')
        return
      }
      reject(new Error('Cannot authenticate user'))
    })
  },
}
