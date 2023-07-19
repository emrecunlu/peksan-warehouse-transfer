import axios from 'axios'
import SnackbarHelper from '../helpers/SnackbarHelper'

const apiService = axios.create({
  baseURL: 'http://192.168.2.251:534/api'
})

apiService.interceptors.request.use(
  async function (config) {
    const apiUrl = await window.api.get('apiUrl')

    config.baseURL = apiUrl + '/api'

    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

apiService.interceptors.response.use(
  function (response) {
    return response
  },
  function (err) {
    if (err?.response) {
      SnackbarHelper.showError(err.response.data?.message ?? 'Hata meydana geldi!')
    } else {
      SnackbarHelper.showError(err.message)
    }

    return Promise.reject(err)
  }
)

export default apiService
