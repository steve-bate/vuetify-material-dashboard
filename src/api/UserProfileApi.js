// Stub API implementation

export default {
  getProfile (username) {
    return new Promise((resolve) => {
      console.log('getProfile', username)
      resolve({
        company: 'My Company',
        companyRole: 'Maker in Chief',
        username: 'myuser',
        email: 'email@example.com',
        firstname: 'Kitten',
        lastname: 'Smith',
        address: '123 Smith Road',
        city: 'Smithville',
        country: 'USA',
        postalcode: '21032',
        about: 'I\'m just an ordinary person.',
        avatar: 'https://a.wattpad.com/useravatar/NerdGirl64.256.211863.jpg',
        favoriteQuote: 'The human race is a monotonous affair. Most people spend the greatest part of ' +
          'their time working in order to live, and what little freedom remains so fills them with fear ' +
          'that they seek out any and every means to be rid of it. -- Goethe',
      })
    })
  },

  updateProfile (data) {
    return new Promise(resolve => {
      console.log('TODO -- updateProfile', data.username)
      resolve()
    })
  },

  followUser (username) {
    return new Promise(resolve => {
      console.log('TODO -- followUser', username)
      resolve()
    })
  },
}
