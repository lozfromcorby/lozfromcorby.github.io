import React, {useContext,useState,useRef} from 'react'
import Appcontext from '../context'
import styles from './stylesheet'
import {FaUser} from 'react-icons/fa'
import Login from './Login'
import Profile from './Profile'
import {dominantColor,secondaryColor} from './stylesheet'

const ProfileButton = ({mobile}) => {
    const {useOnClickOutside,history,currentUser,isProfileOpen,profileOpen,screenSize} = useContext(Appcontext)
    const [hover,setHover] = useState(false)
    const ref = useRef()
    useOnClickOutside(ref, () => isProfileOpen(false))

    const handleProfileClick = () => {
        if(currentUser === null) {
            isProfileOpen(!profileOpen)
        } else {
            screenSize.device === 'desktop' && isProfileOpen(!profileOpen)
            screenSize.device !== 'desktop' && history.push('/account')
        }
    }

    return(
        <>
            <div
                onClick={handleProfileClick}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <FaUser style={{...styles.profileIconLoggedOff, right: mobile ? 60 : 10, color: currentUser  ? 'forestgreen' : profileOpen ? 'orange' : hover ? 'orange' : dominantColor}}  />
            </div>

            {profileOpen && <div ref={ref} style={{
                position: 'fixed',
                display: 'flex',
                flexFlow: 'column wrap',
                paddingTop: 0,
                top: screenSize.device === 'desktop' ? 75 : 0,
                right: screenSize.device === 'desktop' ? 15 : null,
                left: screenSize.device === 'desktop' ? null : 0,
                height: screenSize.device === 'desktop' ? 300 : '100%',
                width: screenSize.device === 'desktop' ? 200 : '100%',
                background: dominantColor,
                borderRadius: 5,
                boxShadow: '0 8px 6px -6px grey',
                color: 'white',
                border: screenSize.device === 'desktop' ? `1px solid ${secondaryColor}` : null,
                fontSize: 14,
                zIndex: 15
            }} >
                {currentUser !== null ? <Profile /> : <div style={{ justifyContent: 'center'}}><Login profileOpen={profileOpen} /></div>}
            </div>}
        </>)
}

export default ProfileButton