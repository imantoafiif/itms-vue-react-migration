import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AccountProvider } from "../../user-account";
import style from './Sidebar.module.scss';

function Sidebar() {

    const user = useContext(AccountProvider)
    const menus = [
        { label: 'Home', url: '/home' },
        { label: 'Page1', url: '/page1' },
        { label: 'Page2', url: '/page2' },
    ]
    var username = null

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
                    <p>
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
                    </p>
                    <p 
                        className="has-text-white"
                        style={{'marginTop': '13px', 'fontSize': '18px'}}>
                        <b>{username}</b>
                    </p>
                </div>
            </div>
            <ul className="menu-list">
                {menus.map((item, key) => (
                    <li key={key}>
                        <Link to={item.url}>{item.label}</Link>
                    </li>
                ))}
                {/* <li><a>Dashboard</a></li>
                <li><a>Customers</a></li> */}
            </ul>
        </aside>
    )
}

export default Sidebar;