import React, { useState } from 'react'
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import './Matrix.scss'

const Matrix = () => {

  const classes = [
    { value: '1', label: 'label 1' }, 
    { value: '2', label: 'label 2' }, 
    { value: '3', label: 'label 3' }, 
    { value: '4', label: 'label 4' }, 
    { value: '5', label: 'label 5' }, 
    { value: '6', label: 'label 6' }, 
    { value: '7', label: 'label 7' }, 
    { value: '8', label: 'label 8' }, 
    { value: '9', label: 'label 9' }, 
  ]

  const [index, setIndex] = useState(0)
  const Swipeable = autoPlay(SwipeableViews);

  const handleChange = index => {
    setIndex(index)
  }

  return (
    <div className='columns is-multiline'>
        <div className='column is-full'>
            <h4 className="title is-4">
                Talent Matrix
            </h4>
            <h6 className='subtitle is-6'>
                <strong>0</strong> Participants, &nbsp;
                <strong>0/0</strong> Discretions
            </h6>
        </div>
        <div className='column is-full'>
          <div className='matrix-wrapper'>
            <div className='columns is-multiline is-mobile'>
              {
                classes.map((item, key) => (
                  <div 
                    align="center"
                    className='column is-one-third wrapper-child'>
                    <div className='columns is-multiline is-vcentered'>
                      <div className='column is-full'>
                        <span
                          style={{'boxShadow': '0px 0px 7px 3px rgba(180, 180, 180, .3)'}} 
                          className='tag is-rounded'>
                          <a className='label is-uppercase is-size-7'>
                            {item.value} - {item.label}
                          </a>
                        </span>
                      </div>
                      <div
                        style={{padding: '40px'}} 
                        className='column is-full'>
                        <Swipeable
                          enableMouseEvents
                          index={index}
                          onChangeIndex={handleChange}>
                          <div className='columns is-multiline is-mobile is-vcentered is-paddingless'>
                            {
                              [1, 2, 3, 4, 5, 6, 7, 8, 9].map(item => (
                                <div
                                  style={{'padding': '2px', 'marginTop': '10px'}} 
                                  className='column is-one-third'>
                                  <img
                                      className='avatar'
                                      src='/img/user_avatar.png'
                                      style={{'border': '3px solid #d3d3d3', 'objectFit': 'cover'}}
                                  />
                                  <br/>
                                  <span className='tag is-rounded'>
                                    <p style={{'fontSize': '12px', 'color': '#000'}}>
                                      Name
                                    </p>
                                  </span>
                                </div>
                              ))
                            }
                          </div>
                          <div className='columns is-multiline is-mobile is-vcentered is-paddingless'>
                            {
                              [1, 2, 3, 4, 5].map(item => (
                                <div
                                  style={{'padding': '2px', 'marginTop': '10px'}} 
                                  className='column is-one-third'>
                                  <img
                                      className='avatar'
                                      src='/img/user_avatar.png'
                                      style={{'border': '3px solid #d3d3d3', 'objectFit': 'cover'}}
                                  />
                                  <br/>
                                  <span className='tag is-rounded'>
                                    <p style={{'fontSize': '12px', 'color': '#000'}}>
                                      Name
                                    </p>
                                  </span>
                                </div>
                              ))
                            }
                          </div>
                        </Swipeable>
                      </div>
                      <div className='column is-full'>
                        <span 
                          style={{'boxShadow': '0px 0px 7px 3px rgba(180, 180, 180, .3)'}}
                          className='tag is-rounded'>
                          Buffer 10
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
    </div>
  )
}

export default Matrix;