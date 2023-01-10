import React from 'react'
import { Navigate } from 'react-router-dom'

interface props {
    children: JSX.Element
}

const Guest = ({ children }: props) => {

    const session = localStorage.getItem('auth.token')

    return (
        <>
            {/* { !session ? 
            props.children : 
            <Navigate to='/'></Navigate> } */}
           { 
                !session ?
                children : 
                <Navigate to='/homepage'></Navigate>
           }
        </>
    )
}

export default Guest