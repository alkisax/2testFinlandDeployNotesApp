import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/notes' //changed to test deploy back/front connection
// const baseUrl = 'https://testfinlanddeploynotesapp-2.onrender.com/api/notes'; // propably wrong url
// const baseUrl = 'https://twotestfinlanddeploynotesapp.onrender.com/api/notes' //changed to test deploy back/front connection
// const baseUrl = '/api/notes' // this because they where uploaded as same service on render

/*
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}*/

const getAll = () => {
  const request = axios.get(baseUrl)
  const nonExisting = {
    id: 10000,
    content: 'This note is not saved to server',
    important: true,
  }
  return request.then(response => response.data.concat(nonExisting))
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { 
  getAll, create, update 
}