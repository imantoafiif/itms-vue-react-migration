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
import { Button, Checkbox, FormControlLabel, InputAdornment, TextField, Typography, createTheme } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Link from '@mui/material/Link';
import { url } from "inspector";
import { Alert } from "@mui/lab";

function Login() {
    
    const theme = createTheme()
    const navigate = useNavigate()
    const [username, setUser] = useState<string | null>(null)
    const [password, setPassword] = useState<string | null>(null)
    const [isLoginError, setIsLoginError] = useState<boolean>(false)
    const [isLoading, setLoading] = useState<boolean>(false)
    const [remember, setRemember] = useState<boolean>(false)
    const account = useContext(AccountProvider)

    useEffect(() => {
        let uname = localStorage.getItem('auth.user')
        let pass = localStorage.getItem('auth.pass')
        if(uname && pass) {
            setUser(CryptoJS.AES.decrypt(uname, SECRET).toString(CryptoJS.enc.Utf8))
            setPassword(CryptoJS.AES.decrypt(pass, SECRET).toString(CryptoJS.enc.Utf8))
            setRemember(true)
        }
    }, [])

    // function identity<T>(value: T): T {
    //     return value;
    //   }
      
    // const foo = <T>(x: T) => x

    const handleChange = <T,>(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, setter: React.Dispatch<React.SetStateAction<T>>) => {
        setter(e.target.value as T)
        setIsLoginError(false)
    }

    const login = async (e:any) => {
        console.log('remember', username)
        e.preventDefault()
        setLoading(true)
        setIsLoginError(false)

        let uname:string | null = localStorage.getItem('auth.user')
        let pass:string | null = localStorage.getItem('auth.pass')

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
                            <Box 
                                onSubmit={login}
                                method="post"
                                component="form" 
                                sx={{ mt: 1 }}>
                                <TextField
                                    value={username}
                                    onChange={e => handleChange<string | null>(e, setUser)}
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
                                    value={password}
                                    onChange={e => handleChange<string | null>(e, setPassword)}
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
                                    control={
                                        <Checkbox 
                                            checked={remember}
                                            onChange={e => setRemember(e.target.checked)}
                                            color="primary" 
                                        />
                                    }
                                    label="Remember me"
                                />
                                {
                                    isLoginError &&<Alert severity="error">Wrong username or password</Alert>
                                }
                                <LoadingButton
                                    loading={isLoading}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}>
                                    Sign In
                                </LoadingButton>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </Guest>
    )
}

export default Login;