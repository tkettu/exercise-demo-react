import axios from 'axios'

//const baseUrl = 'http://localhost:3001/users'
//const baseUrl = '/api/login'
const baseUrl = 'login'

/* const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
} */

const login = async (credentials) => {
  /* const credentials = {
    username,
    password
  } */

  const config = {
    headers: {'Authorization': 'Bearer'}
  }
  const response = await axios.post(baseUrl, credentials, config)
  console.log(response.data)
   
  return response.data
}

export default { login }