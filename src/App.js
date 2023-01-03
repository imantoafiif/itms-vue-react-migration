import { 
  BrowserRouter as Router, 
  Routes, 
  Route,
  Navigate,
} from 'react-router-dom';
import './App.css';
import Login from './pages/Login'
import Page1 from './pages/Page1'
import Page2 from './pages/Page2';
import Home from './pages/Homepage';
import AdminPage from './pages/AdminPage';
import Admin from './layouts/Admin';
import Notfound from './pages/Notfound';
import WithNav from './layouts/WithNav';
import initAccount, { AccountProvider } from './user-account';
import { createContext, useContext, useEffect, useState } from 'react';
import axios from "./axios-config"
import { getBusinessCode, todayDate } from './helper';
import EventManagement from './pages/Talent/event-management';

function App() {
  
  // const account = initAccount()
  const user = useContext(AccountProvider)
  const [store, setStore] = useState({
    user: null,
    menus: {
      admin: null,
    },
    set: data => {
      setStore(state => ({
        ...state,
        user: data,
      }))
    },
    setMenus: item => {
      setStore(state => ({
        ...state,
        menus: {
          ...state.menus,
          admin: 'coy'
        }
      }))
    }
  })

  const initMenus = async () => {
    alert('oy')
    await axios.get(`/ldap/api/rbac/menu-parent`, {
      params: {
          'include': 'menu_child,menu_code',
          'order[SEQNO]': 'ASC',
          'menu_level': 2,
          'business_code': getBusinessCode(),
          'distinct_seqno_mnucd': 'yes',
          'begin_date_lte': todayDate(),
          'end_date_gt': todayDate(),
          'role_code[]':  user.user?.user_role.map(item => item.role_code.role_code),
          'per_page': 999,
      }
    }).then(r => {
      alert('didalem')
      if(Array.isArray(r.data.data) && r.data.data.length) {
        store.setMenus(r.data.data)
      }
    }).catch(e => {
      console.log(e)
    })
  }

  useEffect(() => {
    console.log('store', store)
  }, [store])

  useEffect(() => {
    if(window.location.pathname === '/login') return
    initAccount(setStore)
    // initMenus()
  }, [])

  return (  
    <AccountProvider.Provider value={store}>
      <Router>
        <Routes>
          {/* { true && <Route path='*' element={<Navigate replace to="/"></Navigate>}></Route> } */}
          <Route exact path='*' element={<Notfound/>}></Route>
          <Route exact path='/login' element={<Login/>}></Route>
          <Route exact path='' 
            element={
              store.user ?                 
              <Navigate to='/homepage'></Navigate> : 
              <Navigate to='/login'></Navigate>
            }>
          </Route>
          <Route path='/' element={<WithNav/>}>
            <Route exact path='homepage' element={<Home/>}></Route>
            <Route exact path='page1' element={<Page1/>}></Route>
            <Route path='admin/' element={<Admin/>}>
              <Route path='' element={<AdminPage/>}></Route>
              <Route path='events' element={<EventManagement/>}></Route>
              <Route exact path='page2' element={<Page2/>}></Route>
            </Route> 
          </Route>
        </Routes>
      </Router>
    </AccountProvider.Provider>
  );
}

export default App;
