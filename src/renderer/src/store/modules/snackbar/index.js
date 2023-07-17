const snackbarModule = {
  namespaced: true,
  state: () => ({
    type: null,
    title: null,
    active: false,
    timeout: 3000
  }),
  mutations: {
    show: (state, { type, title, timeout }) => {
      state.active = true
      state.type = type
      state.title = title
      state.timeout = timeout ?? 3000
    },
    close: (state) => {
      state.type = null
      state.title = null
      state.active = false
    }
  },
  actions: {
    show: ({ commit }, payload) => {
      commit('show', payload)
    },
    close: ({ commit }) => {
      commit('close')
    }
  },
  getters: {
    _isActive: (state) => {
      return state.active
    }
  }
}

export default snackbarModule
