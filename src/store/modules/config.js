export default {
  namespaced: true,

  state: () => ({
    config: null,
  }),

  mutations: {
    CONFIG (state, config) {
      for (const [key, value] of Object.entries(config)) {
        state[key] = value
      }
    },
  },

  actions: {
    async load ({ commit }) {
      const response = await fetch('/config.json')
      commit('CONFIG', await response.json())
    },
  },
}
