import axios from 'axios'

const baseUrl = '/api/user'
//const baseUrl = 'http://localhost:3001/users'

const register = async (user) => {
  
  const response = await axios.post(`${baseUrl}/registration`,user)
  
  return response.data
}

const getSportList = async (username) => {
  const response = await axios.get(`${baseUrl}/${username}/sports`)

  console.log(response.data)

  return response.data
}

export default { register }