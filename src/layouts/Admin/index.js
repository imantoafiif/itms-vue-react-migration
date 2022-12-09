import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import PrivateRoute from "../../middleware/PrivateRoute";
import style from './Admin.module.scss'

function Admin() {
    return (
        <>
            {/* <Navbar></Navbar> */}
            <PrivateRoute
                admin_only={true}>
                <div
                    style={{marginTop: '52px'}} 
                    className="columns">
                    <div className={`${style.sidebar} column is-paddingless`}>
                        <Sidebar/>
                    </div>
                    <div className={`${style.content} column is-paddingless`}>
                        <Outlet/>
                    </div>
                </div>
            </PrivateRoute>
        </>
        
    )
}

export default Admin;