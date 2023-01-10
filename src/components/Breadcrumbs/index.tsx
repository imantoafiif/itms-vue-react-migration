import React from 'react'
import { Link } from 'react-router-dom';
import './Breadcrumbs.scss'

interface item {
    label: string,
    to: string,
    key: string,
}

interface BreadcrumbsParams {
    items: item[],
}

const Breadcrumbs = ({ items }: BreadcrumbsParams) => {

    return (
        <nav className='base-breadcrumbs'>
            <ul className='base-breadcrumbs__list'>
                {
                    items.map((item: item) => (
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
