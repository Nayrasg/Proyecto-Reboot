import axios from 'axios'

const api = axios.create({
    baseURL: 'http://vps11.alpuca.com:3000/api/'
})



//Tengo el fichero config.js, me gustaria que en el codigo actual, cambiar todo lo que es http, por variables, para usar la variable ve


// Interceptor para agregar el token a las solicitudes
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // O sessionStorage.getItem('token')
    const rol = localStorage.getItem('rol'); // O sessionStorage.getItem('role')
    if (token) {
      config.headers['authorization'] = token;
    }
    if (rol) {
      config.headers['rol'] = rol;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });
  
  export default api;
  