import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../axios-config";
import { getBusinessCode, todayDate } from "../../helper";
import { AccountProvider } from "../../user-account";
import style from './Sidebar.module.scss';

function Sidebar() {

    const user = useContext(AccountProvider)
    const [menus, setMenus] = useState([])
    var username = null

    useEffect(() => {
        if(!user) return
        getMenu()
    }, [user])

    const getMenu = async () => {
        await axios.get(`/ldap/api/rbac/menu-parent`, {
            params: {
                'include': 'menu_child,menu_code',
                'order[SEQNO]': 'ASC',
                'menu_level': 2,
                'business_code': getBusinessCode(),
                'distinct_seqno_mnucd': 'yes',
                'begin_date_lte': todayDate(),
                'end_date_gt': todayDate(),
                'role_code[]':  user.user?.user_role.map(item => item.role_code.role_code),
                'per_page': 999,
            }
        }).then(r => {
            if(Array.isArray(r.data.data) && r.data.data.length) {
                setMenus(r.data.data)
            }
        }).catch(e => {
            console.log(e)
        })
    }

    return (
        <aside className={style.sidebar}>
            <div className="sidebar-menu is-hidden-mobile">
                <div className={`sidebar-menu ${style.sidebar_banner}`}>
                    <div className="dropdown">
                        <div className="dropdown-trigger">
                            <p style={{'color': '#fff', 'fontSize': '18px', 'borderRadius': '5px', 'margin': 'auto', 'padding': '5px 10px', 'marginBottom': '16px', 'backgroundColor': 'rgba(0, 0, 0, .35)'}}>
                                <a style={{'textDecoration': 'none', 'color': '#fff', }}>
                                    <span style={{'marginRight': '5px'}}></span>
                                    <b>{user.user?.user_role[0].role_code.role_name}</b>
                                    {
                                        user.user?.user_role.length > 1 &&
                                        <i className="fa fa-caret-down" style={{"marginLeft": '5px'}}></i>
                                    }
                                </a>
                            </p>
                        </div>
                        <div 
                            style={{'marginTop': '-14px', 'width': '100%'}}
                            className="dropdown-menu">
                            <div    
                                style={{'background': 'rgba(0, 0, 0, .4)'}} 
                                className="dropdown-content">
                                {
                                    user.user?.user_role.map(item => (
                                        <a 
                                            key={item.object_identifier}
                                            className="dropdown-item has-text-white">
                                            <span style={{'fontWeight': 500}}>
                                                {item.role_code.role_name}
                                            </span>
                                        </a>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div>
                        <figure style={{"margin": 'auto', 'display': 'inline-block'}}>
                            <img    
                                src={user.user?.avatar || '/img/user_avatar.png'}
                                style={{'objectPosition': 'top', 'width': '100px', 'height': '100px', 'borderRadius': '50%', 'border': '2px solid #fff', 'boxShadow': '5px 3px 15px #101010', 'objectFit': 'cover'}}
                                onError={e => {
                                    e.target.onerror = null
                                    e.target.src = '/img/user_avatar.png'
                                }}
                            />
                        </figure>
                    </div>
                    <p 
                        className="has-text-white"
                        style={{'marginTop': '13px', 'fontSize': '18px'}}>
                        <b>{username}</b>
                    </p>
                </div>
                <div style={{paddingBottom: '52px'}}>
                    {
                        menus.map(item => (
                            <Link className="sidebar-men has-text-dark">
                                <div className={`${style.sidebar_menu_parent} ${style.sidebar_menu_parent_active}`}>
                                    <div className="columns is-vcentered">
                                        <div className={`column ${style.sidebar_icon_space}`}>
                                            <i className={`fa fa-${item.menu_code.menu_icon}`}></i>
                                        </div>
                                        <div className="column">
                                            <span style={{fontWeight: '600', fontSize: '12px'}}>
                                                {item.menu_code.menu_name.toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="column is-2 has-text-centered">
                                            <i 
                                                style={{'color': 'rgba(120, 120, 120, .5)'}}
                                                className="fa fa-caret-down">
                                            </i>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                    
                </div>
            </div>
            
        </aside>
    )
}

export default Sidebar;