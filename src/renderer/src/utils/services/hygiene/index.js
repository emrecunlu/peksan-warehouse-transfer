import apiService from '../ApiService'

const getQuestions = async (workPlace = 3) => await apiService.get(`hygiene?workPlace=${workPlace}`)
const sendAnswers = async (answers) => await apiService.post('hygiene', { answers })

const hygieneService = {
  getQuestions,
  sendAnswers
}

export default hygieneService
