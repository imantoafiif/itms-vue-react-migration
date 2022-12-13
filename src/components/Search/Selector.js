import React, { useContext, useEffect, useRef, useState } from 'react'
import Select from 'react-select'
import { searchContext } from '.'

const Selector = ({ placeholder, options, isLoading = false, index }) => {

  const [values, setValues] = useState([])
  const { data, set } = useContext(searchContext)
  const ref = useRef()

  useEffect(() => {
    let v = [...data]
    v[index] = { value: values }
    set(v)
    console.log('ref', ref)
  }, [values])

  useEffect(() => {
    if(!data[index].value) {
      ref.current.clearValue()
    }
  }, [data[index]])

  useEffect(() => {
    console.log(options)
  }, [options])

  return (
    <div className='field has-addons'>
      <div className='control is-expanded'>
        <Select
          ref={ref}
          onChange={items => setValues(items)}
          isMulti 
          isLoading={isLoading}
          placeholder={placeholder}
          options={options}>
        </Select>
      </div>
    </div>
  )
}

export default Selector