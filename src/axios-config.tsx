import axios, { AxiosInstance } from "axios";
import { BASE_URL } from "./helper/env";

const instance:AxiosInstance = axios.create({
    baseURL: BASE_URL
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
    (e:Error) => {
        Promise.reject(e)
    }
)

export default instance;