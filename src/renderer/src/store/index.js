import { createStore } from 'vuex'
import authModule from './modules/auth'
import snackbarModule from './modules/snackbar'

const store = createStore({
  modules: {
    auth: authModule,
    snackbar: snackbarModule
  }
})

export default store
