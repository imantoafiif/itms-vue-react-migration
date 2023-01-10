import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import PrivateRoute from "../../middleware/PrivateRoute";
import './Admin.scss'

function Admin() {
    return (
        <>
            {/* <Navbar></Navbar> */}
            <PrivateRoute
                admin_only={true}>
                <div
                    style={{marginTop: '52px'}} 
                    className="columns">
                    <div className="sidebar column is-paddingless">
                        <Sidebar/>
                    </div>
                    <div className="content column is-paddingless">
                        <Outlet/>
                    </div>
                </div>
            </PrivateRoute>
        </>
        
    )
}

export default Admin;