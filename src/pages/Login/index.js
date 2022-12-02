import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext, useRef } from 'react'
import Guest from "../../middleware/Guest";
import { userSlice, setSession } from '../../store/slices/sessionSlice';
import { useDispatch, useSelector } from "react-redux";
import axios from "../../axios-config";
import { AccountProvider } from "../../user-account";
import CryptoJS  from "crypto-js";
import style from './Login.module.scss';

function Login() {
    
    const navigate = useNavigate()
    const user = useRef()
    const password = useRef()
    const [isLoginError, setIsLoginError] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [remember, setRemember] = useState(false)
    const [selectedMethod, setSelectedMethod] = useState('LDAP')
    const [passwordVisible, setPasswordVisible] = useState(false)
    const account = useContext(AccountProvider)
    const secret = `I!OJ1n4!Nl$cmtv5aB^KK3xV5jNlB72RYSg7OrmoyCBmFpfpmFeZ51LsQ%.VNrNE>uw<P>rnJn6^1!$k>3>TPg'q(B~TBPvRH8/i(s$ucgz+/+e!|`
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

    const login = async e => {
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
            localStorage.setItem('auth.user', CryptoJS.AES.encrypt(user, secret))
            localStorage.setItem('auth.pass', CryptoJS.AES.encrypt(password, secret))
        }

        let sso = null
        if(selectedMethod === 'SSO') {
            console.log(selectedMethod)
            sso = await axios.get(`https://aktivis-api.pnm.co.id/v1/sso/webservice/login`, {
                params: {
                    user: user.current.value,
                    pass: password.current.value,
                    app_code: 'ITMS',
                },
                auth: {
                    username: 'event',
                    password: 'event',
                }
            })
            .then(r => {
                if(r.data.login[0].response === 'TRUE') {
                    return r.data.login[0]
                }
                setIsLoginError(true)
                return null
            })
            .catch(e => {
                setIsLoginError(true)
                console.log(e)
            })

            if(!sso) {
                setLoading(false)
                return
            }
        }

        axios.post('/ldap/api/auth/login', {
            application_id: process.env.REACT_APP_ID,
            password : sso ? 'secret' : password.current.value,
            username: sso ? sso.data[0].nik : user.current.value,
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
                    navigate('/home')
                })
                // localStorage.setItem('token', r.data.access_token)
                // navigate('/home')
            }
        })
        .catch(e => {
            setLoading(false)
            setIsLoginError(true)
            console.log(e)
        })
    }

    return (
        <main className={style.login_page}>
            <form 
                onSubmit={login}
                method="post"
                className={style.login_page__card}>
                <div className={`${style.login_page__card__brand} is-paddingless`}>
                    <img 
                        src="/logo192.png"
                        style={{height: '150px', padding: '25px'}}/>
                </div>
                <div className={style.login_page__card__main}>
                    <div className={style.login_input}>
                        <label className={style.login_input__label}>
                            Method
                        </label>
                        <div className={style.login_input__field}>
                            <i className="fa fa-cog"></i>
                            <select
                                required 
                                onChange={e => setSelectedMethod(e.target.value)}>
                                {
                                    methods.map(item => 
                                        <option    
                                            value={item.value}
                                            key={item.value}>
                                            {item.label}    
                                        </option>
                                    )
                                }
                                {/* <option>LDAP</option>
                                <option>SSO</option> */}
                            </select>
                        </div>
                    </div>
                    <div className={style.login_input}>
                        <label className={style.login_input__label}>
                            Username
                        </label>
                        <div className={style.login_input__field}>
                            <i className="fa fa-user"></i>
                            <input 
                                ref={user}
                                required
                                type="text"
                                autoComplete="on"/>
                        </div>
                    </div>
                    <div className={style.login_input}>
                        <label className={style.login_input__label}>
                            Password
                        </label>
                        <div className={style.login_input__field}>
                            <i className="fa fa-key"></i>
                            <input 
                                ref={password}
                                required
                                type={passwordVisible ? 'text' : 'password'}
                                autoComplete="on"/>
                            <i 
                                onClick={() => setPasswordVisible(!passwordVisible)}
                                className={`fa fa-eye ${style.icon_toggleable}`}>

                            </i>
                        </div>
                    </div>
                </div>
                {
                    isLoginError &&
                    (
                        <div className={`${style.login_error} has-text-centered has-text-weight-bold is-uppercase has-text-danger`}>
                            <span>You have entered invalid credentials</span>
                        </div>
                    ) 
                }
                <div style={{display: "flex", justifyContent: "center", padding: "1rem 0", marginBottom: "1rem"}}>
                    <button 
                        disabled={isLoading}
                        type="submit"
                        className={style.login_page_button}>
                        {
                            isLoading ? 
                            (
                                <span className={style.login_page_button__spinner}>
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
    )
}

export default Login;