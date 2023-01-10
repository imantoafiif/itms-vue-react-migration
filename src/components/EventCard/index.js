import React from 'react'
import { useNavigate } from 'react-router-dom'
import './EventCard.scss'

const EventCard = ({ to }) => {

    const navigate = useNavigate()

    const click = () => {
        console.log(to)
    }

    return (
        <div
            onClick={click} 
            className='box card-list'>
            <div className='columns is-mobile'>
                <div className='column'>
                    asdasd
                </div>
            </div>
        </div>
    )
}

export default EventCard