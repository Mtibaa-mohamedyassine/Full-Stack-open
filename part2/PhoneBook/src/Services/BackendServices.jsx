import axios from 'axios'



const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {

    const request = axios.get(baseUrl)
    return request.then(response => (response.data))                       
}


const addToDb = (newObject) => {

    const request = axios.post(baseUrl, newObject)
    return request.then(response => (response.data))
}

const deleteFromDb = (objectId) => {
    const request = axios.delete(`${baseUrl}/${objectId}`)
    return request.then(response => (response.data))
}

export default {getAll, addToDb, deleteFromDb}