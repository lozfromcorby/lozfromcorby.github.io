import React, {memo} from 'react'

const Redacted = memo((props) => {
    const {pending=false} = props
    const randomIntFromInterval = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
  
    const styles = {
      root: {
        marginTop: 3,
        background: pending ? 'lightyellow' : 'lightgrey',
        height: 18,
        width: pending ? '55%' : randomIntFromInterval(40,60),
        borderRadius: 5,
        fontSize: 10,
        fontWeight: 600,
        paddingTop: 3,
        paddingLeft: 2
      }
    }
    return(
      <div style={styles.root} >{pending && 'Under Offer'}</div>
    )
  })

export default Redacted