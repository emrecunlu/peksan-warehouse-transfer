import apiService from '../ApiService'

const getAll = async (workPlace) => await apiService.get(`staff/?workPlace=${workPlace}`)

const employeeService = {
  getAll
}

export default employeeService
