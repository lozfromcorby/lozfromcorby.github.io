import React, {useContext} from 'react'
import AppContext from '../../context'

const GridItem = (props) => {
    const {screenSize} = useContext(AppContext)
    const {desktopWidth=3,children,mobile=false,tablet=false} = props
    const tabletWidth = tablet ? tablet : desktopWidth*2 > 6 ? 12 : desktopWidth*2
    const mobileWidth = mobile ? mobile : desktopWidth*4 >= 5 ? 12 : desktopWidth*4
    
    let currentWidth = screenSize.device === 'desktop'
                        ? desktopWidth
                        : screenSize.device === 'tablet'
                        ? tabletWidth
                        : mobileWidth

    return (
        <div style={{width: `${currentWidth*8.33}%`, background: 'transparent'}}>
            {children}
        </div>
    )
}

export default GridItem