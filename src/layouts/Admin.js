import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PrivateRoute from "../middleware/PrivateRoute";

function Admin() {
    return (
        <>
            {/* <Navbar></Navbar> */}
            <PrivateRoute>
                <div
                    style={{marginTop: '53px'}} 
                    className="columns">
                    <div
                        style={{borderRight: '1px solid #d3d3d3'}} 
                        className="column is-2">
                        <Sidebar></Sidebar>
                    </div>
                    <div className="column">
                        <Outlet/>
                        {/* {props.children} */}
                    </div>
                </div>
            </PrivateRoute>
        </>
        
    )
}

export default Admin;