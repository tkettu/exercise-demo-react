import axios from 'axios'
import { getConfig } from '../_helpers/config'
const baseUrl = '/api/exercises'



//----ALL GETS---
const getBase = async ( url ) => {

    const response = await axios.get(url, getConfig())
    return response.data
}

const getAll = () => { return getBase(baseUrl) }

const getAllBySport = ( sport ) => { return getBase(`${baseUrl}/sport/${sport}`) }

const getOne = ( id ) => { return getBase(`${baseUrl}/${id}`)}
//----END GETS---

const addNew = async ( content ) => {

    const response = await axios.post(baseUrl, content, getConfig())

    return response.data
}

const deleteExercise = async (id) => {

    const response = await axios.delete(`${baseUrl}/${id}`, getConfig())

    return response.data
}

const updateExercise = async ( id, content ) => {

    const response = await axios.put(`${baseUrl}/${id}`, content, getConfig())
    return response.data
}

export default { getAll, getOne, getAllBySport,
                addNew, deleteExercise, updateExercise  }