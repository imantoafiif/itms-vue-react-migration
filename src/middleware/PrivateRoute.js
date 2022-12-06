import React, { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import checkvalidity from '../helper/check-validity'
import { AccountProvider } from '../user-account'

const PrivateRoute = ({ admin_only = false, children }) => {

    const user = useContext(AccountProvider)
    const session = localStorage.getItem('auth.token')

    if(!checkvalidity(session)) {
        localStorage.removeItem('auth.token')
        return <Navigate to='/login'></Navigate>
    }

    if(admin_only) {
        const is_admin = user.user?.user_role.find(item => {
            return (
                item.role_code.role_code === 'SADMNDYA' ||
                item.role_code.role_code === 'ADMNDYA' || 
                item.role_code.role_code === 'ADMTLNNDYA' ||
                item.role_code.role_code === 'ADMCRRNDYA'
            )
        })
        if(!is_admin) return <Navigate to='/homepage'></Navigate>
    }

    return (
        <>
            { children }
        </>
    )
}

export default PrivateRoute