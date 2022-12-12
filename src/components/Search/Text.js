import React, { useContext, useEffect, useState } from 'react'
import { searchContext } from '.'

const Text = ({ placeholder, id }) => {

    const [text, setText] = useState('')
    const { data, set } = useContext(searchContext)

    useEffect(() => {
    }, [text])

    const onUpdate = index => e => {
        let value = [...data]
        setText(e.target.value)
        value[index] = { value: text }
        set(value)
    }

    return (
    <div className="field has-addons">
        <p className="control is-expanded">
            <input 
                onChange={onUpdate(id)}
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