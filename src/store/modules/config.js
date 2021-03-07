export default {
  namespaced: true,

  state: () => ({
    config: null,
  }),

  mutations: {
    CONFIG (state, config) {
      state.config = config
    },
  },

  actions: {
    async load ({ commit }) {
      const response = await fetch('/config.json')
      console.log('commit config')
      commit('CONFIG', await response.json())
    },
  },
}
