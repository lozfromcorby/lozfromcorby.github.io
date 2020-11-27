import React, {useState,useEffect} from 'react'

const GrowParallex = (props) => {
  const {right = false, xPos = '15%', yPos = '25%', appearAt = 1200, disappearAt = 2400, children} = props

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
    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', background: 'white'}}>
      <div style={{
        background: 'green',
        height: scroll.y > 1650 ? (1650-1300)/2 : (scroll.y-1300)/2,
        width: scroll.y > 1600 ? (1650-1350) : scroll.y-1300,
        borderRadius: `calc(1-100%*0.${scroll.y-1300}px)`,
        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
        }} > </div>
    </div>
  
)

  const styles = {
    root: {
      position: 'fixed',
      top: yPos, [right ? 'right' : 'left']: xPos,
      opacity: scroll.y > appearAt ? (scroll.y > disappearAt ? 0 : 1) : 0,
      transition: 'all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)',
    }
  }

    return(
      children ? <div style={styles.root}>{children}</div> : <DefaultNoContent />
    )
}

export default GrowParallex