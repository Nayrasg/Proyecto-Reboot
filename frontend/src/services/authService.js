import api from "./config"

const login = async (dataForm) => {
    try {
        const { data } = await api.post('auth/login', dataForm)
        localStorage.setItem('token', data.result)
        localStorage.setItem('role', data.role)
        return data
    } catch (error) {
        console.log(error)
    }
}
export {
    login
}