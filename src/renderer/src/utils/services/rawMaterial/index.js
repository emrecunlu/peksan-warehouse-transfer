import apiService from '../ApiService'

const getBarrels = async () => await apiService.get('/rawMaterial/barrels')
const getMaterials = async (workOrder, barrelKg, isColor) =>
  await apiService.get(
    `/rawMaterial?workOrder=${workOrder}&barrelKg=${isColor ? 0 : barrelKg}&isColor=${isColor}`
  )
const getSeries = async (stockCode) =>
  await apiService.get(`/rawMaterial/stockSerial?stockCode=${stockCode}`)
const getFractureSeries = async () => await apiService.get('/rawMaterial/fracture')
const getRatios = async () => await apiService.get('/rawMaterial/ratios')
const transfer = async (data) => await apiService.post('/rawMaterial', data)

const rawMaterialService = {
  getBarrels,
  getMaterials,
  getSeries,
  getFractureSeries,
  getRatios,
  transfer
}

export default rawMaterialService
