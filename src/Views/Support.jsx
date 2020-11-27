import React from "react";
import GridContainer from '../Layout/Grid/GridContainer'
import GridItem from '../Layout/Grid/GridItem'
import {secondaryColor} from '../Layout/stylesheet'

const HelpCard = ({children = ''}) => (
  <div style={{paddingTop: 10, paddingLeft: 10, paddingRight: 10}} >
  <div style={{
    padding: 5,
    border: `0.1px solid ${secondaryColor}`,
    borderRadius: 3,
    height: 200,
    width: '100%',
    background: 'white',
    //boxShadow: '0 8px 6px -6px grey'
  }} >{children}</div>
  </div>
)

const Support = () => {
 return(
   <GridContainer>
     <GridItem desktopWidth={4}>
        <HelpCard />
     </GridItem>
     <GridItem desktopWidth={4}>
      <HelpCard />
     </GridItem>
     <GridItem desktopWidth={4}>
       <HelpCard />
     </GridItem>
     <GridItem desktopWidth={4}>
       <HelpCard />
     </GridItem>
     <GridItem desktopWidth={4}>
        <HelpCard />
     </GridItem>
     <GridItem desktopWidth={4}>
      <HelpCard />
     </GridItem>
   </GridContainer>
 )
};

export default Support;