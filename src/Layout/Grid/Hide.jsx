import React, {useContext} from 'react'
import AppContext from '../../context'

const Hide = (props) => {
    const {screenSize} = useContext(AppContext)
    const {children,hide = "all"} = props

    let screenMatch = hide.includes(screenSize.device) || hide === "all"

    return (
        screenMatch ? null : 
        <React.Fragment>
            {children} 
        </React.Fragment>
    )

}

export default Hide