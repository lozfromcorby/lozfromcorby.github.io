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
import functions from './Hooks/functions'

export default function App() {
  const {nameFormat,logOut,getDistance,getBearing} = functions
  let scroll = useScroll()
  let screenSize = useScreenSize()
  let browserLocation = usePosition()
  const history = useHistory()
  const [menuOpen,isMenuOpen] = useState(false)
  const [maxY,setMaxY] = useState(0)
  
  const [basket,setBasket] = useState(localStorage.basket === undefined ? [] : JSON.parse(localStorage.basket))
  const [content,setContent] = useState([])

  let orderTotal = basket.reduce((acc, item) => acc + Number(item.unit_amount.value), 0)
  let orderLines = basket.reduce((acc, item) => acc + 1, 0)

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
    orderTotal: orderTotal,
    orderLines: orderLines,
    setBasket: setBasket,
    setContent: setContent,
    basket: basket,
    content: content,
    scroll: scroll,
    screenSize: screenSize,
    useOnClickOutside: useOnClickOutside,
    maxY: maxY,
    routes: routes,
    menuOpen: menuOpen,
    isMenuOpen: isMenuOpen,
    nameFormat: nameFormat,
    logOut: logOut,
    history: history,
    browserLocation: browserLocation,
    getDistance: getDistance,
    getBearing: getBearing
  }

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
      <Redirect from='/' to='/comingsoon' />
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


