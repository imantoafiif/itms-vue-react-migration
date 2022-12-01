import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext, useRef } from 'react'
import Guest from "../middleware/Guest";
import { userSlice, setSession } from '../store/slices/sessionSlice';
import { useDispatch, useSelector } from "react-redux";
import axios from "../axios-config";
import { AccountProvider } from "../user-account";
import CryptoJS  from "crypto-js";


function Login() {
    
    const dispatch = useDispatch()
    const userSelector = useSelector(userSlice)
    const navigate = useNavigate()
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setLoading] = useState(false)
    const [remember, setRemember] = useState(false)
    const account = useContext(AccountProvider)
    const secret = `I!OJ1n4!Nl$cmtv5aB^KK3xV5jNlB72RYSg7OrmoyCBmFpfpmFeZ51LsQ%.VNrNE>uw<P>rnJn6^1!$k>3>TPg'q(B~TBPvRH8/i(s$ucgz+/+e!|`
    var careerPositionAspiration = null;

    useEffect(() => {
        let uname = localStorage.getItem('auth.user')
        let pass = localStorage.getItem('auth.pass')
        if(uname && pass) {
            setUser(CryptoJS.AES.decrypt(uname, secret).toString(CryptoJS.enc.Utf8))
            setPassword(CryptoJS.AES.decrypt(pass, secret).toString(CryptoJS.enc.Utf8))
            setRemember(true)
        }
    }, [])

    const submit = (e) => {
        console.log('remember', remember)
        e.preventDefault()
        setLoading(true)

        let uname = localStorage.getItem('auth.user')
        let pass = localStorage.getItem('auth.pass')

        if(uname && pass && !remember) {
            localStorage.removeItem('auth.user')
            localStorage.removeItem('auth.pass')
        }
        
        if(remember) {
            localStorage.setItem('auth.user', CryptoJS.AES.encrypt(user, secret))
            localStorage.setItem('auth.pass', CryptoJS.AES.encrypt(password, secret))
        }

        axios.post('/ldap/api/auth/login', {
            application_id: process.env.REACT_APP_ID,
            password,
            username: user,
        })
        .then(r => {
            // setLoading(false)
            if(r.data) {
                localStorage.setItem('auth.token', r.data.access_token)
                axios.get(`/ldap/api/auth/account`, {
                    params: {
                        include: 'user_role,role_buscd,role_pernr,avatar,notification,personal,position'
                    }
                })
                .then(re => {
                    // console.log('cuk', re)
                    // let session = JSON.stringify(re.data.data)
                    // localStorage.setItem('auth.session', session)
                    dispatch(setSession(re.data.data))
                    account.set(re.data.data)
                    console.log('mboke', account)
                    navigate('/home')
                })
                // localStorage.setItem('token', r.data.access_token)
                // navigate('/home')
            }
        })
        .catch(e => {
            setLoading(false)
            console.log(e)
        })
    }

    return (
        <>
            <Guest>
                <section className="hero is-fullheight">
                    <div className="hero-body">
                        <div className="container">
                            <div className="columns is-centered">
                                <div className="column is-5-tablet is-4-desktop is-3-widescreen">
                                    <form 
                                        onSubmit={submit}
                                        method="post"
                                        action="" 
                                        className="box">
                                        <div className="field">
                                            <label className="label">User</label>
                                            <div className="control has-icons-left">
                                                <input
                                                    value={user}  
                                                    onChange={e => setUser(e.target.value)}
                                                    className="input" required/>
                                                <span className="icon is-small is-left">
                                                <i className="fa fa-user"></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="field">
                                            <label className="label">Password</label>
                                            <div className="control has-icons-left">
                                                <input 
                                                    value={password}
                                                    onChange={e => setPassword(e.target.value)}
                                                    type="password" className="input" required/>
                                                <span className="icon is-small is-left">
                                                <i className="fa fa-lock"></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="field">
                                            <label className="checkbox">
                                                <input
                                                    checked={remember}
                                                    onChange={e => setRemember(e.target.checked)}
                                                    type="checkbox"/>
                                                Remember me
                                            </label>
                                        </div>
                                        <div className="field">
                                            <button
                                                disabled={isLoading} 
                                                className={`button is-success ${isLoading ? 'is-loading' : ''}`}>
                                                Login
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Guest>
            
        </>
    )
}

export default Login;