import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext, useRef } from 'react'
import Guest from "../../middleware/Guest";
import { userSlice, setSession } from '../../store/slices/sessionSlice';
import { useDispatch, useSelector } from "react-redux";
import axios from "../../axios-config";
import { AccountProvider } from "../../user-account";
import CryptoJS from "crypto-js";
import './Login.scss'
import { SECRET } from "../../helper/env";

function Login() {
    
    const navigate = useNavigate()
    const [user, setUser] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [isLoginError, setIsLoginError] = useState<boolean>(false)
    const [isLoading, setLoading] = useState<boolean>(false)
    const [remember, setRemember] = useState<boolean>(false)
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false)
    const account = useContext(AccountProvider)
    const methods = [
        { value: 'LDAP', label: 'LDAP' }, 
        { value: 'SSO', label: 'SSO' }
    ]

    useEffect(() => {
        let uname = localStorage.getItem('auth.user')
        let pass = localStorage.getItem('auth.pass')
        // if(uname && pass) {
        //     setUser(CryptoJS.AES.decrypt(uname, secret).toString(CryptoJS.enc.Utf8))
        //     setPassword(CryptoJS.AES.decrypt(pass, secret).toString(CryptoJS.enc.Utf8))
        //     setRemember(true)
        // }
    }, [])

    const login = async (e:any) => {
        console.log('remember', user)
        e.preventDefault()
        setLoading(true)
        setIsLoginError(false)

        let uname = localStorage.getItem('auth.user')
        let pass = localStorage.getItem('auth.pass')

        if(uname && pass && !remember) {
            localStorage.removeItem('auth.user')
            localStorage.removeItem('auth.pass')
        }
        
        if(remember) {
            localStorage.setItem('auth.user', CryptoJS.AES.encrypt(user, SECRET).toString())
            localStorage.setItem('auth.pass', CryptoJS.AES.encrypt(password, SECRET).toString())
        }

        let sso:any = null

        axios.post('/ldap/api/auth/login', {
            application_id: process.env.REACT_APP_ID,
            password : sso ? 'secret' : password,
            username: sso ? sso.data[0].nik : user,
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
                    account.set(re.data.data)
                    console.log('mboke', account)
                    navigate('/homepage')
                })
                // localStorage.setItem('token', r.data.access_token)
                // navigate('/homepage')
            }
        })
        .catch(e => {
            setLoading(false)
            setIsLoginError(true)
            console.log(e)
        })
    }

    return (
        <Guest>
            <main className="login-page">
                <form 
                    onSubmit={login}
                    method="post"
                    className="login-page__card">
                    <div className="login-page__card__brand is-paddingless">
                        <img 
                            src="/logo192.png"
                            style={{height: '150px', padding: '25px'}}/>
                    </div>
                    <div className="login-page__card__main">
                        <div className="login-input">
                            <label className="login-input__label">
                                Username
                            </label>
                            <div className="login-input__field">
                                <i className="fa fa-user"></i>
                                <input 
                                    onChange={(e) => setUser(e.target.value)}
                                    required
                                    type="text"
                                    autoComplete="on"/>
                            </div>
                        </div>
                        <div className="login-input">
                            <label className="login-input__label">
                                Password
                            </label>
                            <div className="login-input__field">
                                <i className="fa fa-key"></i>
                                <input 
                                    required
                                    type={passwordVisible ? 'text' : 'password'}
                                    autoComplete="on"/>
                                <i 
                                    onClick={() => setPasswordVisible(!passwordVisible)}
                                    className="fa fa-eye icon-toggleable">

                                </i>
                            </div>
                        </div>
                    </div>
                    {
                        isLoginError &&
                        (
                            <div className="has-text-centered has-text-weight-bold is-uppercase has-text-danger">
                                <span>You have entered invalid credentials</span>
                            </div>
                        ) 
                    }
                    <div style={{display: "flex", justifyContent: "center", padding: "1rem 0", marginBottom: "1rem"}}>
                        <button 
                            disabled={isLoading}
                            type="submit"
                            className="login-page-button">
                            {
                                isLoading ? 
                                (
                                    <span className="login-page-button__spinner">
                                        <i className="fa fa-spinner"></i>
                                    </span>
                                ) :
                                (<span>LOGIN</span>)
                            }
                        </button>
                    </div>
                    <br></br>
                </form>
            </main>
        </Guest>
    )
}

export default Login;