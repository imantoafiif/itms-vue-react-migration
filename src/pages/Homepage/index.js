import React, { useContext, useEffect, useState } from "react";
import PrivateRoute from "../../middleware/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { getBusinessCode, getSession, todayDate } from "../../helper";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "../../axios-config";
import style from './Homepage.module.scss';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

function Home() {

    const styles = {
        slide: {
            padding: 15,
            minHeight: '100',
            color: '#fff',
        },
    };

    const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
    const [books, setBooks] = useState([])
    const dispatch = useDispatch()
    // const session = useSelector(state => state.user.user)
    console.log('s', getSession())

    const getBooks = async () => {
        // let temp_books = []
        // let is_fetching = true
        // while(is_fetching) {
            
        // }



        // await axios.get(`/hcis/api/guide-book`, {
        //     params: {
        //         business_code: getBusinessCode(),
        //         end_date_gte: todayDate(),
        //     }
        // })
        // .then(r => {
        //     if(Array.isArray(r.data.data) && r.data.data.length) {
        //         setBooks(r.data.data)
        //     }
        // })
        // .catch(e => {
        //     console.log(e)
        // })
    }

    useEffect(() => {
        getBooks()
    }, [])

    return (
        <PrivateRoute>
            <Carousel
                emulateTouch={true}
                swipeable={true}
                useKeyboardArrows={true}
                autoPlay={true}
                dynamicHeight={true}
                infiniteLoop={true}
                showThumbs={false} 
                showArrows={true}>
                <div>
                    <img 
                        style={{'width': '100%', 'height': '100vh', 'objectFit': 'cover'}}
                        src="https://res.cloudinary.com/practicaldev/image/fetch/s--jIjY95PE--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://images.unsplash.com/photo-1529675641475-78780f1fd4b0%3Fixlib%3Drb-1.2.1%26ixid%3DeyJhcHBfaWQiOjEyMDd9%26auto%3Dformat%26fit%3Dcrop%26w%3D1350%26q%3D80"/>
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img
                        style={{'width': '100%', 'height': '100vh', 'objectFit': 'cover'}} 
                        src="https://res.cloudinary.com/practicaldev/image/fetch/s--cvNvQnPO--/c_imagga_scale,f_auto,fl_progressive,h_500,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/11ndud5gzv8syvf2uoax.png" />
                    <p className="legend">Legend 1</p>
                </div>
            </Carousel>
            <br></br>
            <p className="title is-3 has-text-centered">Guide Books</p>
            
            <div style={{position: 'relative'}}>
                <AutoPlaySwipeableViews
                    enableMouseEvents>
                    <div style={styles.slide}>
                        <div className="columns is-vcentered is-centered">
                            {
                                [1, 2, 3, 4, 5].map(item => (
                                    <div
                                        className="column is-narrow has-text-centered">
                                        <a
                                            target="_blank">
                                            <div style={{textAlign: 'center'}}>
                                                <img
                                                    src="/img/user_avatar.png"
                                                    style={{'boxShadow': '0px 0px 10px #d3d3d3'}}
                                                    className={`${style.guidebook}`}
                                                />
                                            </div>
                                            <div className={`${style.guidebook_title} tag is-info is-uppercase`}>
                                                book {item}
                                            </div>
                                        </a>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div style={styles.slide}>
                        <div className="columns is-vcentered is-centered">
                            {
                                    [6, 7, 8, 9, 10].map(item => (
                                        <div
                                            className="column is-narrow has-text-centered">
                                            <a
                                                target="_blank">
                                                <div style={{textAlign: 'center'}}>
                                                    <img
                                                        src="/img/user_avatar.png"
                                                        style={{'boxShadow': '0px 0px 10px #d3d3d3'}}
                                                        className={`${style.guidebook}`}
                                                    />
                                                </div>
                                                <div className={`${style.guidebook_title} tag is-info is-uppercase`}>
                                                    book {item}
                                                </div>
                                            </a>
                                        </div>
                                    ))
                                }
                        </div>
                    </div>
                    <div style={styles.slide}>
                        <div className="columns is-vcentered is-centered">
                            {
                                    [11, 12, 13].map(item => (
                                        <div
                                            className="column is-narrow has-text-centered">
                                            <a
                                                target="_blank">
                                                <div style={{textAlign: 'center'}}>
                                                    <img
                                                        src="/img/user_avatar.png"
                                                        style={{'boxShadow': '0px 0px 10px #d3d3d3'}}
                                                        className={`${style.guidebook}`}
                                                    />
                                                </div>
                                                <div className={`${style.guidebook_title} tag is-info is-uppercase`}>
                                                    book {item}
                                                </div>
                                            </a>
                                        </div>
                                    ))
                                }
                        </div>
                    </div>
                    {/* <div style={Object.assign({}, styles.slide, styles.slide3)}>slide n°3</div> */}
                </AutoPlaySwipeableViews>
            </div>
            
            
            {/* <div style={{position: 'relative'}}>
                <AutoPlaySwipeableViews 
                    style={{overflow: 'hidden'}} 
                    enableMouseEvents>
                    <div 
                        className="columns is-vcentered is-centered">
                        {
                            [1, 2, 3].map(item => (
                                <div
                                    className="column is-narrow has-text-centered">
                                    <a
                                        target="_blank">
                                        <div style={{textAlign: 'center'}}>
                                            <img
                                                src="/img/user_avatar.png"
                                                style={{'boxShadow': '0px 0px 10px #d3d3d3'}}
                                                className={`${style.guidebook}`}
                                            />
                                        </div>
                                        <div className={`${style.guidebook_title} tag is-info is-uppercase`}>
                                            book
                                        </div>
                                    </a>
                                </div>
                            ))
                        }
                    </div>
                        
                    
                </AutoPlaySwipeableViews>
            </div> */}
            
            {/* <div className="columns is-vcentered is-centered">
                {
                    books.map(item => (
                        <div
                            key={item.object_identifier}
                            className="column is-narrow has-text-centered">
                            <a 
                                target="_blank"
                                href={item.guidebook}>
                                <div style={{'textAlign': 'center'}}>
                                    <img
                                        src={item.image}
                                        style={{'boxShadow': '0px 0px 10px #d3d3d3'}}
                                        className={`${style.guidebook}`}
                                    />
                                </div>
                                <div className={`${style.guidebook_title} tag is-info is-uppercase`}>
                                    {item.title}
                                </div>
                            </a>
                        </div>
                    ))
                }
            </div> */}
            <br/>
        </PrivateRoute>    
    )
}

export default Home;