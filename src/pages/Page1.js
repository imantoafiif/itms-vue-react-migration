import React, { useContext, useEffect, useRef, useState } from "react";
import PrivateRoute from "../middleware/PrivateRoute";
import WithNav, { Theme } from "../layouts/WithNav";
import { Account } from "../user-account";
// import Admin from "../layouts/Admin";

function Page1() {

    const theme = useContext(Theme)

    const change = () => {
        theme.changeTheme(inputref.current.value)
        console.log(inputref.current.value)
    }

    const inputref = useRef()

    return (
       <>
       <PrivateRoute>
            <section className="hero is-fullheight-with-navbar has-text-centered">
                <div className="hero-body">
                    <div 
                        style={{width: '100%'}}
                        className="">
                    <div style={{marginBottom: '12px;'}}>
                        <input
                            ref={inputref} 
                            class="input"/>
                    </div>
                    <div>
                        <button
                            onClick={change}
                            class="button">
                            change
                        </button>
                    </div>
                    </div>
                </div>
            </section>
       </PrivateRoute>
        
       </>
    )
}

export default Page1;