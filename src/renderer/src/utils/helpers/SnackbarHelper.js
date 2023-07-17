import store from '@/store'

class SnackbarHelper {
  static showError(title, timeout = 3000) {
    store.dispatch('snackbar/show', { title, timeout, type: 'error' })
  }

  static showSuccess(title, timeout = 3000) {
    store.dispatch('snackbar/show', { title, timeout, type: 'success' })
  }
}

export default SnackbarHelper
