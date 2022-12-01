import React from "react";
import { useSelector } from "react-redux";
// import WithNav from "../layouts/WithNav";
import Admin from "../layouts/Admin";
import { counterSlice } from '../store/slices/sessionSlice'

function AdminPage() {

    const counter = useSelector(counterSlice)

    console.log('counter', counter)

    return (
       <>
        <section className="hero is-fullheight-with-navbar has-text-centered">
            <div className="hero-body">
                <div 
                    style={{width: '100%'}}
                    className="">
                <p className="title">
                    Admin
                </p>
                <p className="subtitle">
                    This page is for admin only
                </p>
                <p>{ counter }</p>
                </div>
            </div>
        </section>
       </>
    )
}

export default AdminPage;