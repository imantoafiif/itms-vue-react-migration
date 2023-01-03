import React, { useEffect, useState } from 'react'
import axios from '../../../axios-config'
import Breadcrumbs from '../../../components/Breadcrumbs'
import Search from '../../../components/Search'
import Selector from '../../../components/Search/Selector'
import Text from '../../../components/Search/Text'
import { getBusinessCode, todayDate } from '../../../helper'
import ReactLoading from 'react-loading';
import './event-management.scss'

const EventManagement = () => {

    const [events, setEvents] = useState()

    const crumbs = [
        { label: 'Home', to: '/', key: 'HOME' },
        { label: 'Talent', to: '#', key: 'TALENT' },
    ]

    const [searchItems, setSearchItems] = useState([
        { type: 'text', placeholder: 'Search 1' },
        { type: 'text', placeholder: 'Search 2' },
        { type: 'text', placeholder: 'Search 3' },
        { type: 'selector', placeholder: 'Search 4', isLoading: true, options: [] }
    ])

    const onSearch = v => {

    }

    const fetchEvents = () => {
        axios.get(`/tms/api/event`, {
            params: {
                'begin_date_lte': todayDate(),
                'end_date_gte': todayDate(),
                'business_code': getBusinessCode(),
                'order[CHGDT]': 'desc',
                'event_type': ['ET', 'ETP', 'ETQ', 'ETD', 'ETC', 'ETPL'],
                'include': 'committee,head_committee'
            }
        }).then(r => {
            if(Array.isArray(r.data.data) && r.data.data.length) {
                setEvents(r.data.data)
            }
        }).catch(e => {
            console.log(e)
        })
    }

    useEffect(() => {
        fetchEvents()
    }, [])

    return (
        <section className='section-container'>
            <div className="columns is-multiline is-marginless is-paddingless">
                <div className="column is-full">
                    <h1 className="title is-3">
                        Talent
                    </h1>
                </div>
                <div className='column is-full'>
                    <Breadcrumbs items={crumbs}/>
                </div>
                <div className='column is-full'>
                    <Search onSearch={onSearch}>
                            {
                                searchItems.map((item, key) => {
                                    switch(item.type) {
                                        case 'text' :
                                        return (
                                            <Text 
                                                index={key} 
                                                placeholder={item.placeholder}>
                                            </Text>
                                        )
                                        case 'selector' : 
                                        return (
                                            <Selector 
                                                index={key} 
                                                isLoading={item.isLoading} 
                                                placeholder={item.placeholder} 
                                                options={item.options}>    
                                            </Selector>
                                        )
                                    }
                                })
                            }
                        </Search>
                </div>
                <div className='column is-full'>
                    <h4 className='title is-4'>
                        {events ? events.length : 0} Available Events
                        {/* <ReactLoading type="bubbles" color="blue" /> */}
                    </h4>
                </div>
                <div className='column is-full'>
                    {
                        events ? 
                        (
                            //if length is 0 then events has been fetched but no ongoing events are available
                            events.length ? <></> : <></>
                        ) : 
                        <p className='has-text-centered'>Loading</p>
                    }
                </div>
            </div>
        </section>
    )
}

export default EventManagement;