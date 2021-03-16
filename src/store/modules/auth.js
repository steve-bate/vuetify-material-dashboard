import authApi from '../../api/AuthenticationApi'

export default {
  namespaced: true,

  state: () => ({
    token: null,
  }),

  mutations: {
    TOKEN (state, token) {
      state.token = token
    },
    MESSAGE (state, message) {
      state.message = message
    },
  },

  getters: {
    isAuthenticated: state => {
      return state.token !== null
    },
  },

  actions: {
    async authenticate ({ commit }, credentials) {
      try {
        const token = await authApi.authenticate(credentials)
        commit('TOKEN', token)
      } catch (error) {
        commit('TOKEN', null)
        throw error
      }
    },
  },
}
