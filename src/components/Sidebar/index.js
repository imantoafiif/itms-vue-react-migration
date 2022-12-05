import React from "react";
import { Link } from "react-router-dom";
import style from './Sidebar.module.scss';

function Sidebar() {
    const menus = [
        { label: 'Home', url: '/home' },
        { label: 'Page1', url: '/page1' },
        { label: 'Page2', url: '/page2' },
    ]

    return (
        <aside className={style.sidebar}>
            <div className="sidebar-menu is-hidden-mobile">
                <div className="sidebar-menu">
                    
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