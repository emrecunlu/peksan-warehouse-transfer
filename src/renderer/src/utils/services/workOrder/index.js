import apiService from '../ApiService'

const getById = async (machineId) => await apiService.get(`/workOrder?machineId=${machineId}`)

const workOrderService = {
  getById
}

export default workOrderService
