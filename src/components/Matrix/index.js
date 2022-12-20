import React, { useEffect, useState } from 'react'
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import './Matrix.scss'
import axios from "../../axios-config";
import { getBusinessCode, todayDate } from '../../helper';
import { ReactSortable } from "react-sortablejs";

const Matrix = ({ allow_discretion = true }) => {

  const [clusters, setClusters] = useState([
    { cluster: { id: 5, label: null }, data: null }, 
    { cluster: { id: 8, label: null }, data: null }, 
    { cluster: { id: 9, label: null }, data: null }, 
    { cluster: { id: 3, label: null }, data: null }, 
    { cluster: { id: 6, label: null }, data: null }, 
    { cluster: { id: 7, label: null }, data: null }, 
    { cluster: { id: 1, label: null }, data: null }, 
    { cluster: { id: 2, label: null }, data: null }, 
    { cluster: { id: 4, label: null }, data: null }, 
  ])

  const [index, setIndex] = useState(0)
  const Swipeable = autoPlay(SwipeableViews);

  const handleChange = event => {
    let t_clusters = [...clusters]
    t_clusters[parseInt(event.to.id)].data.data.splice(
      event.newIndex, 
      0, 
      t_clusters[parseInt(event.from.id)].data.data[event.oldIndex]
    )
    t_clusters[parseInt(event.from.id)].data.data.splice(event.oldIndex, 1)
    setClusters(t_clusters)
    console.log(clusters)
  }

  const initPools = () => {
    for (const [index, pool] of clusters.entries()) {
      axios.get(`/tms/api/talent-pool`, {
        params: {
           begin_date_lte: todayDate(),
           end_date_gte: todayDate(),
           business_code: getBusinessCode(),
           per_page: 9999,
           include: 'personnel_number,avatar',
           event_code: '*',
           talent_cluster_id: pool.cluster.id,
        }
      }).then(r => {
        let t_pool = [...clusters]
        if(Array.isArray(r.data.data)) {
          t_pool[index].data = r.data
          setClusters(t_pool)
          console.log('clusters', clusters)
          return
        }
        t_pool[index].data = []
        setClusters(t_pool)
        console.log('clusters', clusters)
      })
    }
  }

  const fetchClassifications = async () => {
    const mapping = [2, 1, 5, 4, 0, 8, 3, 7, 6]
    await axios.get('/ldap/api/objects', {
      params: {
        'object_type[]': '9GRID',
        'business_code': getBusinessCode(),
        'order[STEXT]': 'desc'
      }
    }).then(r => {
      let t_pool = [...clusters]
      for(const [index, map] of mapping.entries()) {
        t_pool[map].cluster.label = r.data.data[index].value
      }
      setClusters(t_pool)
    })
  }

  useEffect(() => {
    fetchClassifications()
    initPools()
  }, [])

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
                clusters.map((item, key) => (
                  <div 
                    key={key}
                    align="center"
                    className='column is-one-third wrapper-child'>
                    <div className='columns is-multiline is-vcentered'>
                      <div className='column is-full'>
                        <span
                          style={{'boxShadow': '0px 0px 7px 3px rgba(180, 180, 180, .3)'}} 
                          className='tag is-rounded'>
                          <a className='label is-uppercase is-size-7'>
                            {item.cluster.id} - {item.cluster.label}
                          </a>
                        </span>
                      </div>
                      <div
                        style={{padding: '40px', height: '432px', overflowY: 'auto', overflowX: 'hidden'}} 
                        className='column is-full'>
                        {
                            item.data ? (
                              <ReactSortable
                                id={key}
                                className="columns is-multiline is-mobile is-vcentered is-paddingless" 
                                tag="div"
                                list={clusters}
                                setList={() => {}}
                                group="shared"
                                animation={200}
                                delayOnTouchStart={true}
                                delay={2}
                                onEnd={updated => handleChange(updated)}
                                style={{height: '100%'}}> 
                                {
                                  item.data.data.map((t, key) => (
                                    <div
                                      key={key}
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
                                          {t.personnel_number.complete_name.split(" ")[0]}
                                        </p>
                                      </span>
                                    </div>
                                  ))
                                }
                              </ReactSortable>
                            ) : 
                            <center>Loading</center>
                          }
                      </div>
                      <div className='column is-full'>
                        <span 
                          style={{'boxShadow': '0px 0px 7px 3px rgba(180, 180, 180, .3)'}}
                          className='tag is-rounded'>
                          <strong>
                            {item.data?.data.length || 0}
                            &nbsp;Buffer{item.data ? (item.data.meta.pagination.total > 1 ? 's' : '') : ''}
                          </strong>
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