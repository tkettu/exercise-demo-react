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

    console.log("ATMA ON " + token)
    console.log('CONFIG ' + config)
    
    const response = await axios.get(baseUrl, config)
      .then(response => {
          console.log(response.data)
          return JSON.stringify(response.data)      
      })
      .catch((error) => {
          console.log('error ' + error)
          
      })
    //const response = await axios.get(baseUrl)
    
    
    
}

export default { getAll }