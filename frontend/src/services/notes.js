import axios from 'axios'
// const baseUrl = 'http://localhost:3001/api/notes' //changed to test deploy back/front connection
// const baseUrl = 'https://testfinlanddeploynotesapp-2.onrender.com/api/notes'; // propably wrong url
const baseUrl = 'https://twotestfinlanddeploynotesapp.onrender.com/api/notes' //changed to test deploy back/front connection
// const baseUrl = '/api/notes' // this because they where uploaded as same service on render

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { 
  getAll, create, update, setToken 
}