import axios from 'axios'
import { getConfig } from "../_helpers/localStorage"

const baseUrl = '/api/user'
//const baseUrl = 'http://localhost:3001/users'

const register = async (user) => {
  
  const response = await axios.post(`${baseUrl}/registration`,user)
  
  return response.data
}

const getDefaultSports = async () => {
  const response = await axios.get('/sports', getConfig())
}  

export default { register }