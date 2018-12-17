import axios from 'axios'

const baseUrl = '/api/users'
//const baseUrl = 'http://localhost:3001/users'

const register = async (user) => {
  const response = await axios.post(`${baseUrl}/registration`,user)
  console.log(response.data)
  
  return response.data
}

export default { register }