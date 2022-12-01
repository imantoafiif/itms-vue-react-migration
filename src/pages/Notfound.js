import React from "react";
import WithNav from "../layouts/WithNav";

function Notfound() {
    return (
       <>
        <section className="hero is-fullheight-with-navbar has-text-centered">
                <div className="hero-body">
                    <div 
                        style={{width: '100%'}}
                        className="">
                    <p className="title">
                        404
                    </p>
                    <p className="subtitle">
                        Not found
                    </p>
                    </div>
                </div>
            </section>
       </>
    )
}

export default Notfound;