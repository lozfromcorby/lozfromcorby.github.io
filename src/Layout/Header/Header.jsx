import React, {useContext,useState} from 'react'
import {NavLink} from "react-router-dom"
import AppContext from '../../context'
import ProfileButton from '../ProfileButton'
import MenuButton from '../MenuButton'
import styles, {secondaryColor} from '../stylesheet'
import GridItem from '../Grid/GridItem'

const MenuItem = ({title='title',path='/'}) => {
    const [hover,setHover] = useState(false)
    let activeLink = window.location.href.slice(-7) === path.slice(-7)
    return (
            <NavLink to={path} style={{textDecoration: 'none'}} onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)}>
                <div style={{...styles.menuItem,color: activeLink ? secondaryColor : hover ? secondaryColor : 'white'}} >
                    <div style={styles.menuItemText} >
                    {title}
                    </div>
                    <div style={{...styles.menuItemBar, width: activeLink ? 0 : hover ? '100%' : 0}} />
                </div>
            </NavLink>
  )
}

const Header = () => {
    const {maxY,scroll,screenSize,routes} = useContext(AppContext)
    //const [hover,setHover] = useState(false)
    const changeOpacity = (position) => {
        return {...styles.sloganText,opacity: maxY > position ? 1 : 0 }
      }

    return(
        <div
            style={{...styles.headerContainer,opacity: 1 }}//scroll.direction === 'up' ? 1 : scroll.y < 10 ? 1 : hover ? 1 : 0.8}}
            //onMouseEnter={() => setHover(true)}
            //onMouseLeave={() => setHover(false)}
        >
            {screenSize.device === 'desktop' &&
                <div style={{...styles.menuContainer,top: scroll.direction === 'down' ? 0: 75}} >
                    {routes.map(item => (
                            <MenuItem key={item.path} title={item.name} path={item.path} />
                            ))}
                </div>}
            <div style={styles.header} >
            <GridItem>
            <div style={styles.logo} >
                <span className="glitch" data-text="ダ disrupters.ltd">ダ Disrupters</span>
            </div>
            </GridItem>
            <GridItem>
            {screenSize.device === 'desktop' &&  <div style={styles.slogan} >
                {['Logistical ','Solutions. ','Digital ','World. '].map((item,key) => (
                    <span key={item} style={changeOpacity(700+(500*key))} >{item}</span>
                ))}
            </div>}
            </GridItem>
            <GridItem>
            {screenSize.device === 'desktop' ? <ProfileButton /> : <><ProfileButton mobile /><MenuButton /></>}
            </GridItem>
            </div>
        </div>
    )
}

export default Header