import React, {useState,useEffect} from 'react'
import {Switch,Route, Redirect, NavLink} from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import './App.css'
import routes from './routes'
import styles from './Layout/stylesheet'
import AppContext from './context'
import useScreenSize from './Hooks/useScreenSize'
import useScroll from './Hooks/useScroll'
import usePosition from './Hooks/usePosition'
import useOnClickOutside from './Hooks/useOnClickOutside'
import Header from './Layout/Header/Header'
import Footer from './Layout/Footer/Footer'
import AuthService from './services/auth.service'
import functions from './Hooks/functions'
import loadingcogs from './loadingcogs.svg'
import UserService from './services/user.service'

export default function App() {
  const {nameFormat,logOut,getDistance,getBearing,tawkTo} = functions
  let scroll = useScroll()
  let screenSize = useScreenSize()
  let browserLocation = usePosition()
  const history = useHistory()
  const [menuOpen,isMenuOpen] = useState(false)
  const [profileOpen,isProfileOpen] = useState(false)
  const [showModeratorBoard, setShowModeratorBoard] = useState(false)
  const [showAdminBoard, setShowAdminBoard] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [maxY,setMaxY] = useState(0)
  
  useEffect(() => {
    UserService.checkApiConnection().then((result) => {
      console.log(result.status === 200 ? 'api ok' : 'could not connent to api')
    })
  },[])

  useEffect(() => {
    const user = AuthService.getCurrentUser()
    if (user) {
      setCurrentUser(user)
      setShowModeratorBoard(user.roles.includes('ROLE_MODERATOR'))
      setShowAdminBoard(user.roles.includes('ROLE_ADMIN'))
    }
  }, [])

  useEffect(() => {
    setMaxY(9999)
    //setMaxY(maxY => scroll.y > maxY ? scroll.y : maxY)
    },[scroll.y])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  },[menuOpen])


  const appContext = {
    scroll: scroll,
    screenSize: screenSize,
    useOnClickOutside: useOnClickOutside,
    maxY: maxY,
    routes: routes,
    menuOpen: menuOpen,
    isMenuOpen: isMenuOpen,
    currentUser: currentUser,
    nameFormat: nameFormat,
    logOut: logOut,
    isProfileOpen: isProfileOpen,
    profileOpen: profileOpen,
    history: history,
    browserLocation: browserLocation,
    getDistance: getDistance,
    getBearing: getBearing,
    showAdminBoard: showAdminBoard,
    showModeratorBoard: showModeratorBoard,
    loadingcogs: loadingcogs
  }

useEffect(() => {
    tawkTo('5f8feef0f91e4b431ec6447e')
}, [tawkTo])


  return (
    <AppContext.Provider value={appContext}>
      <Header />
      <div style={{paddingTop:  screenSize.device === 'mobile' ? 65 : 130}}>
      <Switch>
        {routes.map(prop => {
            return (
              <Route
                key={prop.path}
                path={prop.path}
                render={props => (
                  <prop.component
                    //props here
                    {...props}
                  />
                )}
              />
            )
      })}
      {showAdminBoard && <Route path='/admin' component='' />}
      {showModeratorBoard && <Route path='/mod' component='' />}
      <Redirect from='/' to='/rework' />
      </Switch>
      </div>
      <Footer />
        <div style={{...styles.slideMenuDarken, opacity: menuOpen ? 0.8 : 0, pointerEvents: !menuOpen && 'none'}} onClick={() => isMenuOpen(false)} />
        <div style={{...styles.slideMenu, marginRight: menuOpen ? '0%' : -240}} >
        {routes.map(item => (
                <NavLink key={item.path} to={item.path} style={{textDecoration: 'none'}}>
                  <div onClick={() => isMenuOpen(false)} style={{color: 'white', fontWeight: 600, padding: 10, fontSize: 'calc(12px + 2vmin)'}}>
                    {item.name}
                  </div>
                </NavLink>
                ))}
        </div>
    </AppContext.Provider>
  )
}


