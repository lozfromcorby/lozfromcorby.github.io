import React, { useState, useEffect } from 'react'

function Parallax(props) {
    const {xPosOffset = null, yPosOffset = null, speed=1 , right = false, children = false, pauseLength = 1000} = props
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
              top: '100%',
              width: '100%',
              display: 'flex',
              flexFlow: 'nowrap',
              justifyContent: 'space-around',
              padding: 0,
              margin: 0,
              //zIndex: 20,
              [right ? 'right' : 'left']: xPosOffset,
              transform: `translate(0, ${( scroll.y/speed >= ((yPosOffset+500)+(pauseLength)) ? (-scroll.y/speed)+(yPosOffset+500) : scroll.y/speed >= (yPosOffset+500) ? -(yPosOffset+500) : -scroll.y/speed)}px)`,
              transition: 'all 0.66s linear',

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