// src/services/authService.js
import api from "./config"


  const login = async (formData) => {
    try {
        const { data } = await api.post('auth/login', formData)
        console.log(data.rol)
        localStorage.setItem('token', data.result)
        localStorage.setItem('rol', data.rol)
        return data
    } catch (error) {
        console.log(error)
    }
}


export{login}