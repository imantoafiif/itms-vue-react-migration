import React, { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "../axios-config";
import Navbar from "../components/Navbar";
import { getBusinessCode } from "../helper";

interface t_store {
    data: any,
    changeTheme: (c:string) => void
}

export const Theme = createContext<t_store | null>(null)

function WithNav() {

    const [store, setStore] = useState<t_store>({
        data: null,
        changeTheme: (c:string) => {
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
            <Navbar/>
            <Outlet/>
        </Theme.Provider>
        
    )
}

export default WithNav;