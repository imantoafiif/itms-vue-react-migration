import React from "react";
import PrivateRoute from "../middleware/PrivateRoute";
import WithNav from "../layouts/WithNav";

function Page2() {
    return (
       <>
        <PrivateRoute>
            <section className="hero is-fullheight-with-navbar has-text-centered">
                <div className="hero-body">
                    <div 
                        style={{width: '100%'}}
                        className="">
                    <p className="title">
                        Page 2
                    </p>
                    <p className="subtitle">
                        This is page 2
                    </p>
                    </div>
                </div>
            </section>
        </PrivateRoute>
        
       </>
    )
}

export default Page2;