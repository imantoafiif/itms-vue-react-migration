import React, { createContext, useEffect, useState } from 'react'

const searchContext = createContext()

const Search = ({ children, onSearch }) => {

    const [store, setStore] = useState({
        data: (
            Array.isArray(children) ?  
            children.map(() => ({ value: null }))
            : [{ value: null }]
        ),
        set: data => {
            setStore(state => ({
                ...state,
                data
            }))
        }
    })

    const submit = e => {
        e.preventDefault()
        onSearch(store)
    }

    const [toggleFilter, setToggleFilter] = useState(false)

    return (
        <searchContext.Provider value={store}>
            <form 
                method='post'
                onSubmit={submit}  
                className='box'>
                <div className='columns is-vcentered'>
                    <div className='column'>
                        <h4 className="title is-4">Search Filters</h4>
                    </div>
                    {
                        children.length > 1 && 
                        (
                            <div 
                                align="right"
                                className='column'>
                                <div className='field'>
                                    <span className='tag'>
                                        <a onClick={() => setToggleFilter(!toggleFilter)}>
                                            <span className='mr-2'>Advanced Filters</span>
                                            <i className='fa fa-caret-down'></i>
                                        </a>
                                    </span>
                                </div>
                            </div>
                        )
                    }
                </div>
                { Array.isArray(children) ? children[0] : <children/> }
                {
                    toggleFilter && 
                    children.map((item, key)=> {
                        if(key != 0) return item
                    })
                }
                <div 
                    align="right"
                    className='columns is-vcentered'>
                    <div className='column'>
                        <button
                            type='submit'
                            className="button mr-1">
                            Search
                        </button>
                        <button
                            onClick={() => {
                                setStore(state => ({
                                    ...state,
                                    data: Array.isArray(children) ?  
                                    children.map(() => ({ value: null }))
                                    : [{ value: null }]
                                }))
                                console.log('sadas', children.ref)
                            }}
                            className="button">
                            Reset
                        </button>
                    </div>
                    
                </div>
            </form>
        </searchContext.Provider>
    )
}

export default Search;
export { searchContext };