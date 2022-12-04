import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../axios-config";
import { todayDate } from "../../helper";
import { Theme } from "../../layouts/WithNav";
import { AccountProvider } from "../../user-account";
import style from './Navbar.module.scss'

function Navbar() {

    const user = useContext(AccountProvider)
    const theme = useContext(Theme)
    const navigate = useNavigate()
    const [menus, setMenu] = useState([])

    const logout = () => {
        localStorage.removeItem('auth.token')
        navigate('/login')
    }

    useEffect(() => {
        if(!user.user) return
        initMenus()
    }, [user])

    const initMenus = async () => {
        await axios.get('/ldap/api/rbac/menu-parent', {
            params: {
                'include': 'menu_child,menu_code',
                'order[SEQNO]': 'ASC',
                'menu_level': 1,
                'role_code[]': user.user.user_role.map(item => item.role_code.role_code),
                'distinct_seqno_mnucd': 'yes',
                'begin_date_lte': todayDate(),
                'end_date_gte': todayDate(),
                'per_page': 999,
            }
        }).then(r => {
            if(Array.isArray(r.data.data) && r.data.data.length) {
                setMenu(r.data.data)
            }
        }).catch(e => {
            console.log(e)
        })
    }

    return (
        <>
            <nav
                style={{borderBottom: '1px solid #d3d3d3', background: `${theme.data?.color_theme}`}} 
                className={`${style.app_} navbar is-transparent is-fixed-top`}>
                <div
                    style={{'justifyContent': 'space-between'}} 
                    className="navbar-brand is-flex">
                    <div
                        style={{backgroundImage: `url('${theme.data?.logo}')`, width: '100px', height: '100%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: '50%'}}
                        className={`navbar-item is-paddingless is-hidden-mobile`}>
                    </div>
                    <div className="navbar-burger" data-target="navbarExampleTransparentExample">
                    </div>
                </div>

                <div className="navbar-menu">
                    <div className="navbar-start">
                    {
                        menus.map((item, key) => 
                            (<Link
                                key={key}
                                to={item.menu_code.menu_url}
                                className={`has-text-white navbar-item ${item.menu_child.length && 'has-dropdown is-hoverable'}`}>
                                {
                                    item.menu_child.length ? 
                                    (
                                        <>
                                            <span className="navbar-link has-text-white">
                                                {item.menu_code.menu_name}
                                            </span>
                                            <div className="navbar-dropdown is-boxed">
                                                {
                                                    item.menu_child.map(child => 
                                                        <Link
                                                            key={child.object_identifier}
                                                            className="navbar-item" 
                                                            to={child.menu_child.menu_url}>
                                                            {child.menu_child.menu_name}
                                                        </Link>
                                                    )
                                                }
                                            </div>
                                        </>
                                    ) :
                                    <span>{item?.menu_code.menu_name}</span>
                                }
                            </Link>)
                        )
                    }
                    </div>

                    <div className="navbar-end">
                        <div className={`navbar-item is-hidden-mobile ${style.avatar_container}`}>
                            <img
                                src={user.user?.avatar?.avatar} 
                                className={`is-rounded`}
                                style={{'objectFit': 'cover', 'objectPosition': 'top', 'width': '32px', 'height': '32px', 'borderRadius': '50%', 'maxHeight': 'unset'}}
                                onError={e => {
                                    e.target.onError = null
                                    e.target.src = '/img/user_avatar.png'
                                }}    
                            />
                        </div>
                        <div className="navbar-item">
                            <div className="field is-grouped">

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