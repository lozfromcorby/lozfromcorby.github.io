import React from 'react'

function GridContainer(props) {
  const {children, justify = 'center', padding = 10} = props

  const styles = {
      container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: justify,
        alignItems: 'center',
        padding: padding,
        paddingLeft: '5%',
        paddingRight: '5%',
        marginLeft: 0,
        transition: 'all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)'
      }
  }

  return (
    <div style={styles.container}>
        {children}
    </div>
  );
}

export default GridContainer