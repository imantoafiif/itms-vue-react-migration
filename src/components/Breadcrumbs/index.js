import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import './Breadcrumbs.scss'

const Breadcrumbs = ({ items }) => {

    return (
        <nav className='base-breadcrumbs'>
            <ul className='base-breadcrumbs__list'>
                {
                    items.map(item => (
                        <li 
                            key={item.key} 
                            className='base-breadcrumbs__list__item'>
                            <Link to={item.to}>
                                {item.label}
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}

export default Breadcrumbs;
