import React, {useEffect, useState} from 'react'
import { NavLink } from "react-router-dom";

const MenuItem = (props) => {
    const {path,title} = props
    const [hover,setHover] = useState(false)
    
    const styles = {
        menuItem: {
            position: 'relative',
            alignSelf: 'center',
            background: '#1C2029',
            minWidth: 'calc(90px + 7vmin)',
            fontWeight: 600,
            fontSize: 22,
            cursor: 'pointer',
            transition: 'all 0.66s cubic-bezier(0.685, 0.0473, 0.346, 1)'
        },
        menuItemBar: {
            position: 'absolute',
            bottom: 0,
            height: 4,
            background: 'white',
            transition: 'all 0.66s cubic-bezier(0.685, 0.0473, 0.346, 1)',
            border: `0.5px solid ${'#1C2029'}`,
            borderBottom: '0'
        },
        menuItemText: {
            paddingTop: 12,
            paddingLeft: 0,
            paddingRight: 0,
            paddingBottom: 11,
            textAlign: 'center',
        }
    }

    const [myPath,setMyPath] = useState('')
    useEffect(() => {
        setMyPath(window.location.hash.slice(1))

    },[window.location.hash])


    return(
        <NavLink to={path} activeStyle={{color: 'orange'}} style={{color: hover ? 'orange' : 'white', textDecoration: 'none'}} onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)}>
            <div style={styles.menuItem} >
                <div style={styles.menuItemText} >
                {title}
                </div>
                <div style={{...styles.menuItemBar, width: hover ? '100%' : 0, background: myPath === path ? 'orange' : hover ? 'orange' : 0}} />
            </div>
        </NavLink>
    )
}

export default MenuItem