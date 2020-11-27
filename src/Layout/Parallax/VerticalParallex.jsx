import React, { useState, useEffect } from 'react'

function Parallax(props) {
    const {xPosOffSet = null, yPos = null, effectStart = 600, right = false, pauseLength = 400, jump = 400, children = false} = props
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
  

    const DefaultNoContent = () => (
        <div style={{
          width: 200,
          height: 25,
          textAlign: 'center',
          fontSize: 18,
          color: 'white',
          fontWeight: 700,
          background: 'black',
          padding: 5,
          borderRadius: 10
        }}>
            Scroll Effect 2.0 - {scroll.y.toFixed(0)}
        </div>
    )

  return (
          <div
            style={{
              position: 'fixed',
              top: yPos,
              width: '100%',
              display: 'flex',
              flexFlow: 'nowrap',
              justifyContent: 'space-around',
              padding: 0,
              margin: 0,
              //zIndex: 20,
              [right ? 'right' : 'left']: xPosOffSet,
              opacity: ( scroll.y >= (effectStart+99) && scroll.y <= (effectStart+pauseLength+199) ) ? 1 : 0,
              transform: `translate(0, ${scroll.y >= (effectStart+100) ? (scroll.y >= (effectStart+pauseLength+199) ? -jump : 0) : jump}px)`,
              transition: 'all 0.66s cubic-bezier(0.685, 0.0473, 0.346, 1)',

            }}
          >
              {children ? children : <DefaultNoContent />}
          </div>
  );
}

export default Parallax

/*
    <div style={{position: 'fixed', top: 200, width: '100%', display: 'flex', flexFlow: 'nowrap', justifyContent: 'space-around', padding: 0, margin: 0, zIndex: 20 }}>

      <div style={{background: 'red', width: 200, height: 200, textAlign: 'center'}}>Hi</div>

    </div>
*/