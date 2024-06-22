import axios from 'axios'

const api = axios.create({
    baseURL: 'http://vps11.alpuca.com:3000/api/'
})

export default api