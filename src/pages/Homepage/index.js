import React, { useContext, useEffect, useState } from "react";
import PrivateRoute from "../../middleware/PrivateRoute";
import { increment } from '../../store/slices/sessionSlice';
import WithNav from "../../layouts/WithNav";
import { useDispatch, useSelector } from "react-redux";
import { getBusinessCode, getSession, todayDate } from "../../helper";
import { AccountProvider } from "../../user-account";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "../../axios-config";
import style from './Homepage.module.scss';

function Home() {

    const user = useContext(AccountProvider)
    const [books, setBooks] = useState([])
    const dispatch = useDispatch()
    // const session = useSelector(state => state.user.user)
    const session = getSession()
    console.log('s', getSession())

    useEffect(() => {
        getBooks()
    }, [])

    const getBooks = async () => {
        await axios.get(`/hcis/api/guide-book`, {
            params: {
                business_code: getBusinessCode(),
                end_date_gte: todayDate(),
            }
        })
        .then(r => {
            if(Array.isArray(r.data.data) && r.data.data.length) {
                setBooks(r.data.data)
            }
        })
        .catch(e => {
            console.log(e)
        })
    }

    return (
       <>
        {/* <Default    
            children={'test'}> */}
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
            <p class="title is-3 has-text-centered">Guide Book</p>
            <div className="columns is-vcentered is-centered">
                {
                    books.map(item => (
                        <div className="column is-narrow has-text-centered">
                            <a 
                                target="_black"
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
            </div>
            <br/>
        </PrivateRoute>        
       </>
    )
}

export default Home;