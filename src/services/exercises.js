import axios from 'axios'

const baseUrl = '/api/exercises'


let token = null


const getConfig = () => {
    
    try {
        token = localStorage.getItem('user')    
    } catch (error) {
        
    }

    const config  = {
        headers: {'Authorization': "Bearer " + token}
    }

    console.log(config)
    
    return config
}

const getAll = async () => {

    const response = await axios.get(baseUrl, getConfig())
     
    return response.data   
}

const getOne = async ( id ) => {

    const response = await axios.get(`${baseUrl}/${id}`, getConfig())
    console.log(response.data)
    
    return response.data
}

const addNew = async ( content ) => {

    const response = await axios.post(baseUrl, content, getConfig())

    return response.data
}

const deleteExercise = async (id) => {

    const response = await axios.delete(`${baseUrl}/${id}`, getConfig())

    return response.data
}

const updateExercise = async ({ id, content }) => {

    const response = await axios.put(`${baseUrl}/${id}`, content, getConfig())
    return response.data
}

export default { getAll, addNew, deleteExercise, updateExercise, getOne }