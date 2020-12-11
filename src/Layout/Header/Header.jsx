import React, {useContext,useState} from 'react'
import {NavLink} from "react-router-dom"
import AppContext from '../../context'
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
    const {scroll,screenSize,routes,orderLines} = useContext(AppContext)

    return(
        <div
            style={{...styles.headerContainer,opacity: 1 }}
        >
            {screenSize.device === 'desktop' &&
                <div style={{...styles.menuContainer,top: scroll.direction === 'down' ? 0: 75}} >
                    {routes.map(item => (  
                            <MenuItem key={item.path} title={item.name === 'Basket' ? `Basket (${orderLines} items)` : item.name} path={item.path} />
                            ))}
                </div>}
            <div style={styles.header} >
            <GridItem>
            <div style={styles.logo} >
                <span className="glitch" data-text="ダ disrupters.uk">ダ Disrupters</span>
            </div>
            </GridItem>
            {false && <GridItem>
            {screenSize.device !== 'desktop' && <MenuButton />}
            </GridItem>}
            </div>
        </div>
    )
}

export default Header