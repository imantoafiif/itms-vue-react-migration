import { createContext, useContext } from "react"
import axios from "./axios-config"

export const AccountProvider = createContext()

const initAccount = setAccount => {

    axios.get(`/ldap/api/auth/account`, {
        params: {
            include: 'user_role,role_buscd,role_pernr,avatar,notification,personal,position'
        }
    })
    .then(r => {
        if(r.data.message === 'unauthenticated') {
            return
        }
        return setAccount(state => ({
            ...state, 
            user: r.data.data
        }))
    })
    .catch(e => {
        console.log(e)
    })
   
}

export default initAccount