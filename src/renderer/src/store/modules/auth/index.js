const authModule = {
  namespaced: true,
  state: () => ({
    employee: null,
    isLoggedIn: false
  }),
  mutations: {
    login: (state, payload) => {
      state.employee = payload
      state.isLoggedIn = true
    },
    logout: (state) => {
      state.employee = null
      state.isLoggedIn = false
    }
  },
  actions: {
    login: ({ commit }, payload) => {
      commit('login', payload)
    },
    logout: ({ commit }) => {
      commit('logout')
    }
  },
  getters: {
    _employee: (state) => state.employee
  }
}

export default authModule
