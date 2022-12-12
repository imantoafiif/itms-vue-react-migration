import React, { useContext, useEffect, useRef, useState } from 'react'
import { searchContext } from '.'

const Text = ({ placeholder, index }) => {

    const [text, setText] = useState('')
    const { data, set } = useContext(searchContext)
    const ref = useRef()

    useEffect(() => {
        let values = [...data]
        values[index] = { value: text }
        set(values)
    }, [text])

    // on reset
    useEffect(() => {
        if(!data[index].value) {
            ref.current.value = ''
        }
    }, [data[index]])

    return (
        <div className="field has-addons">
            <p className="control is-expanded">
                <input 
                    ref={ref}
                    onChange={e => setText(e.target.value)}
                    className="input" 
                    type="text" 
                    placeholder={`${placeholder}`}/>
            </p>
            <p className="control">
                <a className="button is-static">
                    <i className='fa fa-search'></i>
                </a>
            </p>
        </div>
    )
}

export default Text