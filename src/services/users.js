import axios from 'axios'
import { getConfig } from '../_helpers/config'

const baseUrl = '/api/user'
//const baseUrl = 'http://localhost:3001/users'

const register = async (user) => {
  
  const response = await axios.post(`${baseUrl}/registration`,user)
  
  return response.data
}

const getSportList = async (username) => {
  console.log(username)
  
  const response = await axios.get(`${baseUrl}/sports`, getConfig())

  console.log(response.data)

  return response.data
}

export default { register, getSportList }
