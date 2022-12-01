import React, { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "../axios-config";
import Navbar from "../components/Navbar";
import { getBusinessCode } from "../helper";

export const Theme = createContext()

function WithNav() {

    const [store, setStore] = useState({
        data: {
            color_theme: '#fff',
        },
        changeTheme: c => {
            setStore(prevstate => ({
                ...prevstate,
                data: {
                    ...prevstate.data,
                    color_theme: c,
                }
            }))
        }
    })

    useEffect(() => {
        axios.get(`/ldap/api/setting`, {
            params: {
                business_code: getBusinessCode()
            }
        })
        .then(r => {
            console.log(r)
            setStore(prevstate => ({
                ...prevstate,
                data: {
                    ...prevstate.data,
                    ...r.data.data
                }
            }))
        })
    }, [])

    useEffect(() => {
        console.log('coy', store)
    }, [store])

    return (
        <Theme.Provider value={store}>
            <Navbar color={store.data.color_theme}/>
            <Outlet/>
        </Theme.Provider>
        
    )
}

export default WithNav;