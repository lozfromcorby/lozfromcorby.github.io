import React, {useContext} from 'react'
import AppContent from '../context'
import styles from './stylesheet'

const MenuButton = () => {
    const {menuOpen,isMenuOpen} = useContext(AppContent)

    return(
            <div
                style={styles.menuIcon}
                onClick={() => isMenuOpen(!menuOpen)}
            >
                <button className={`hamburger hamburger--elastic ${menuOpen ? 'is-active' : ''}`} type="button">
                    <span className="hamburger-box">
                        <span className="hamburger-inner"></span>
                    </span>
                </button>
            </div>
    )
}

export default MenuButton