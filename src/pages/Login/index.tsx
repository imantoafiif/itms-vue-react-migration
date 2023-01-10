import { Link as Navigate, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext, useRef } from 'react'
import Guest from "../../middleware/Guest";
import { userSlice, setSession } from '../../store/slices/sessionSlice';
import { useDispatch, useSelector } from "react-redux";
import axios from "../../axios-config";
import { AccountProvider } from "../../user-account";
import CryptoJS from "crypto-js";
import './Login.scss'
import { APP_ID, SECRET } from "../../helper/env";
import { ThemeProvider } from "@mui/system";
import { Button, Checkbox, FormControlLabel, TextField, Typography, createTheme } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Link from '@mui/material/Link';
import { url } from "inspector";

function Login() {
    
    const theme = createTheme()
    const navigate = useNavigate()
    const [username, setUser] = useState<string | null>(null)
    const [password, setPassword] = useState<string | null>(null)
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
        console.log('remember', username)
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
            localStorage.setItem('auth.user', CryptoJS.AES.encrypt(username as string, SECRET).toString())
            localStorage.setItem('auth.pass', CryptoJS.AES.encrypt(password as string, SECRET).toString())
        }

        let sso:any = null

        axios.post('/ldap/api/auth/login', {
            application_id: APP_ID,
            username,
            password,
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
            <ThemeProvider theme={theme}>
                <Grid container component="main" sx={{ height: '100vh' }}>
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            backgroundImage: 'url(/img/login_bg.jpg)',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',  
                        }}>
                    </Grid>
                    <Grid 
                        item 
                        xs={12} 
                        sm={8} 
                        md={5} 
                        component={Paper} 
                        elevation={6} 
                        square>
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}>
                            <img 
                                src="/logo192.png"
                                style={{height: '150px', padding: '25px'}}/>
                            {/* <Typography component="h1" variant="h5">
                                Sign in
                            </Typography> */}
                            <Box 
                                onSubmit={login}
                                method="post"
                                component="form" 
                                sx={{ mt: 1 }}>
                            <TextField
                                onChange={e => setUser(e.target.value)}
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                            />
                            <TextField
                                onChange={e => setPassword(e.target.value)}
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </ThemeProvider>
            {/* <main className="login-page">
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
            </main> */}
        </Guest>
    )
}

export default Login;