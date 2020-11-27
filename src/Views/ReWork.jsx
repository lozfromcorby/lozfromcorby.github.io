import React, {useState} from "react";
import GridContainer from '../Layout/Grid/GridContainer'
import GridItem from '../Layout/Grid/GridItem'
import ReWorkEntry from '../Layout/ReWorkEntry'
import {secondaryColor} from '../Layout/stylesheet'

const ReWorks = () => {

 const [flow,setFlow] = useState(0)

 const handleClick = (val) => {
  setFlow(flow+val)
 }

 return(
   <GridContainer>
     <GridItem desktopWidth={7}>
      <div style={{position: 'relative', overflow: 'hidden', marginTop: 10, width: '100%', height: 510, background: 'grey'}}>

        <div
          onClick={() => handleClick(1)}
          style={{
            position: 'relative',
            left: 0,
            transition: 'all 0.66s cubic-bezier(0.685, 0.0473, 0.346, 1)'
          }}>
          <ReWorkEntry />
        </div>

        <div
          style={{
            position: 'relative',
            left: flow > 0 ? 0 : '100%',
            top: -510,
            height: 510,
            background: 'grey',
            transition: 'all 0.66s cubic-bezier(0.685, 0.0473, 0.346, 1)'
          }}>
          Page 2 {flow}
          <div style={{position: 'absolute', bottom: 20, left: 20}}>
          <button 
                onClick={() => handleClick(-1)}
                style={{                       
                  background: secondaryColor,
                  outline: 'none',
                  border: 'none',
                  height: 40,
                  width: 100,
                  fontSize: 20,
                  padding: 5,
                  color: 'white',
                  borderRadius: 3,
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >Back</button>
          <button 
                onClick={() => handleClick(+1)}   
                style={{                    
                  background: secondaryColor,
                  outline: 'none',
                  border: 'none',
                  marginLeft: 2,
                  height: 40,
                  width: 100,
                  fontSize: 20,
                  padding: 5,
                  color: 'white',
                  borderRadius: 3,
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >Next</button>
          </div>
        </div>

        <div
          onClick={handleClick}
          style={{
            position: 'relative',
            left: flow > 1 ? 0 : '100%',
            top: -1020,
            height: 510,
            background: 'grey',
            transition: 'all 0.66s cubic-bezier(0.685, 0.0473, 0.346, 1)'
          }}>
          Page 3 {flow}
        </div>


      </div>
     </GridItem>
   </GridContainer>
 )
};

export default ReWorks;