import axios from 'axios'

const apiService = axios.create({
  baseURL: 'http://192.168.2.251:6066/api'
})

export default apiService
