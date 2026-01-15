import axios from 'axios'

const request = axios.create({
  timeout: 10000
})

request.interceptors.response.use(
  response => response.data,
  error => {
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

export default request

