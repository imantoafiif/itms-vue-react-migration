import { 
  BrowserRouter as Router, 
  Routes, 
  Route,
  Navigate,
} from 'react-router-dom';
import './App.css';
import Login from './pages/Login'
import Home from './pages/Home'
import Page1 from './pages/Page1'
import Page2 from './pages/Page2';
import AdminPage from './pages/AdminPage';
import Admin from './layouts/Admin';
import Notfound from './pages/Notfound';
import WithNav from './layouts/WithNav';
import initAccount, { AccountProvider } from './user-account';
import { createContext, useContext, useEffect, useState } from 'react';
import axios from "./axios-config"

function App() {
  
  // const account = initAccount()

  const [account, setAccount] = useState({
    user: null,
    set: data => {
      setAccount(state => ({
        ...state,
        user: data,
      }))
    }
  })

  useEffect(() => {
    if(window.location.pathname === '/login') return
    initAccount(setAccount)
  }, [])

  return (  
    <AccountProvider.Provider value={account}>
      <Router>
        <Routes>
          {/* { true && <Route path='*' element={<Navigate replace to="/"></Navigate>}></Route> } */}
          <Route exact path='*' element={<Notfound/>}></Route>
          <Route exact path='/login' element={<Login/>}></Route>
          <Route exact path='' 
            element={
              account.user ?                 
              <Navigate to='/home'></Navigate> : 
              <Navigate to='/login'></Navigate>
            }>
          </Route>
          <Route path='/' element={<WithNav/>}>
            <Route exact path='home' element={<Home/>}></Route>
            <Route exact path='page1' element={<Page1/>}></Route>
            <Route path='admin/' element={<Admin/>}>
              <Route path='' element={<AdminPage/>}></Route>
              <Route exact path='page2' element={<Page2/>}></Route>
            </Route> 
          </Route>
        </Routes>
      </Router>
    </AccountProvider.Provider>
  );
}

export default App;
