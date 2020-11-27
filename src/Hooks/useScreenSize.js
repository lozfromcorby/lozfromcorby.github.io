import { useState, useEffect } from "react";

const useScreenSize = () => {

    const mediaQuery = {
        desktop: 1500,
        tablet: 1024,
        phone: 768,
    }

    const [liveScreenSize, setLiveScreenSize] = useState(
        {
            width: window.innerWidth,
            height: window.innerHeight,
            device: window.innerWidth > mediaQuery.tablet ? 'desktop' : window.innerWidth > mediaQuery.phone ? 'tablet' : 'mobile'
        })

    useEffect(() => {

        const mediaQuery = {
            desktop: 1500,
            tablet: 1024,
            phone: 768,
        }

        const updateDimensions = () => {
            let detectDevice = window.innerWidth > mediaQuery.tablet
            ? 'desktop'
            : window.innerWidth > mediaQuery.phone
            ? 'tablet'
            : 'mobile'
            let update_width = window.innerWidth
            let update_height = window.innerHeight
            setLiveScreenSize({ width: update_width, height: update_height, device: detectDevice })
        }

        updateDimensions()
        window.addEventListener('resize', updateDimensions)
        return function cleanup() {
        window.removeEventListener('resize', updateDimensions)
        
        }
    }, [])


    return liveScreenSize

}

export default useScreenSize