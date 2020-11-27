import { useState, useEffect } from "react";

const useScroll = () => {

    const [scroll, setScroll] = useState({
        x: document.body.getBoundingClientRect().left,
        y: document.body.getBoundingClientRect().top,
        direction: ''
      })

      const listener = e => {
        setScroll(prev => ({
          x: document.body.getBoundingClientRect().left,
          y: -document.body.getBoundingClientRect().top,
          direction: prev.y > -document.body.getBoundingClientRect().top ? 'up' : 'down'
        }))
      }
    
      useEffect(() => {
        window.addEventListener('scroll', listener)
        return () => window.removeEventListener('scroll', listener)
      }, [])


    return scroll

}

export default useScroll