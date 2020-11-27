import React, {useState,useEffect} from 'react'

const FixedParallax = (props) => {
  const {right = false, xPosOffset = null, yPos = null, appearAt = 1500, z=-2, disappearAt = 5400, children, inRight = false, outRight = false} = props

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
      height: 100,
      textAlign: 'center',
      fontSize: 18,
      color: 'white',
      fontWeight: 700,
      background: 'darkgreen',
      padding: 5,
      borderRadius: 10
    }}>
        Scroll Effect 2.0 - {scroll.y.toFixed(0)}
    </div>
)

    return(
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
        [right ? 'right' : 'left']: xPosOffset,
        opacity: scroll.y > appearAt ? (scroll.y > disappearAt ? 0 : 1) : 0,
        transform: `translate(${scroll.y >= (appearAt) ? (scroll.y >= (disappearAt) ? (inRight ? 400 : -400) : 0) : (outRight ? 400 : -400)}px,0)`,
        transition: 'all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)',
        zIndex: z

      }}
    >
        {children ? children : <DefaultNoContent />}
    </div>
    )
}

export default FixedParallax