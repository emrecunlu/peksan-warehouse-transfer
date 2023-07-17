import apiService from '../ApiService'

const getAll = async () => await apiService.get('/machine')

const machineService = {
  getAll
}

export default machineService
