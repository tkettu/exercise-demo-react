import axios from 'axios'

const baseUrl = '/api/exercises'


let token = null


const getAll = async () => {

    try {
        token = localStorage.getItem('user')    
    } catch (error) {
        
    }

    const config  = {
        headers: {'Authorization': "Bearer " + token}
      }

    const response = await axios.get(baseUrl, config)
      /* .then(response => {
          console.log(response.data)
          //return JSON.stringify(response.data)
          return response.data      
      })
      .catch((error) => {
          console.log('error ' + error)
          
      }) */
      console.log(response.data)
      console.log(typeof(response.data))
      return response.data
    //const response = await axios.get(baseUrl)
   
}

export default { getAll }