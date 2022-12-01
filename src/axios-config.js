import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL
});

instance.interceptors.request.use(
    async config => {
        const token = localStorage.getItem('auth.token')
        config.headers = {
            Authorization: (token ? `Bearer ${token}` : null),
            Accept: 'application/json',
        }
        return config
    }, 
    error => {
        Promise.reject(error)
        alert('token expired')
    }
)

// instance.interceptors.response.use(
//     async config => {

//     }
// )

export default instance;