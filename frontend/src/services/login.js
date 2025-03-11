import axios from 'axios'
// const baseurl = '/api/login' // propably to be used on the dist
// const baseurl = 'https://twotestfinlanddeploynotesapp.onrender.com/api/login' // For deployed backend
const baseurl = 'http://localhost:3001/api/login' // For local development

const login = async credentials => {
  const response = await axios.post(baseurl, credentials)
  return response.data
}

export default { login }
