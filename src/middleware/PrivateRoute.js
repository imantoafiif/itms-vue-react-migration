import React, { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import checkvalidity from '../helper/check-validity'
import { AccountProvider } from '../user-account'

const PrivateRoute = props => {

    const account = useContext(AccountProvider)
    const session = localStorage.getItem('auth.token')

    if(!checkvalidity(session)) {
        localStorage.removeItem('auth.token')
        return <Navigate to='/login'></Navigate>
    }

    return (
        <>
            { props.children }
        </>
    )
}

export default PrivateRoute