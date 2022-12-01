import React from "react";
import { useNavigate, Link } from "react-router-dom";

function Navbar({ color }) {

    const navigate = useNavigate()
    const menus = [
        {label: 'Home', url: '/home'},
        {label: 'Page1', url: '/page1'},
        {label: 'Page2', url: '/admin/page2'},
        {label: 'Admin', url: '/admin'}
    ]

    function logout() {
        localStorage.removeItem('auth.token')
        navigate('/login')
    }

    return (
        <>
            <nav
                style={{borderBottom: '1px solid #d3d3d3', background: `${color}`}} 
                className="navbar is-transparent is-fixed-top">
                <div className="navbar-brand">
                    <a 
                        style={{fontSize: '22px'}}
                        className="navbar-item">
                        <strong>LOGO</strong>
                    </a>
                    <div className="navbar-burger" data-target="navbarExampleTransparentExample">
                    <span></span>
                    <span></span>
                    <span></span>
                    </div>
                </div>

                <div id="navbarExampleTransparentExample" className="navbar-menu">
                    <div className="navbar-start">
                    {
                        menus.map((item, key) => 
                            (<Link
                                style={{color: 'white'}}
                                key={key}
                                to={item.url}
                                className="navbar-item">
                                {item.label}
                            </Link>)
                        )
                    }
                
                    </div>

                    <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="field is-grouped">
                            {/* <p className="control">
                                <a className="bd-tw-button button" data-social-network="Twitter" data-social-action="tweet" data-social-target="https://bulma.io" target="_blank" href="https://twitter.com/intent/tweet?text=Bulma: a modern CSS framework based on Flexbox&amp;hashtags=bulmaio&amp;url=https://bulma.io&amp;via=jgthms">
                                <span className="icon">
                                    <i className="fab fa-twitter"></i>
                                </span>
                                <span>
                                    Tweet
                                </span>
                                </a>
                            </p> */}
                            <p className="control">
                                <a  
                                    onClick={logout}>
                                    <strong>LOGOUT</strong>
                                </a>
                            </p>
                        </div>
                    </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;