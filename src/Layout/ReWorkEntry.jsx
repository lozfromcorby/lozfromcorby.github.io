import React from "react";
import Hide from './Grid/Hide'
import {dominantColor,secondaryColor} from './stylesheet'
import rework from '../images/rework.PNG'

const ReWorks = () => {
 return(
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-end',
            background: dominantColor,
            color: 'white',
            width: '100%',
            height: 510,
            borderRadius: 3
          }}>

        <div style={{position: 'absolute', top: 0, fontSize: 'calc(10px + 2vmin)', paddingLeft: 12, fontWeight: 700}}>
        Divert <span style={{color: secondaryColor}}>&nbsp;>&nbsp;</span> ReWork <span style={{color: secondaryColor}}>&nbsp;>&nbsp;</span> ReRoute
            </div>

            <div style={{
              flex: '1 1 auto',
              padding: 10,
              margin: 10,
              }} >
              <div>
              <span style={{fontWeight: 700}}>What we can do:</span>
              <ul>
                <li style={{color: secondaryColor}}><span style={{color: 'white', fontWeight: 600}}>Bagging / Rebagging</span></li>
                <li style={{color: secondaryColor}}><span style={{color: 'white', fontWeight: 600}}>Labelling / Relabelling</span></li>
                <li style={{color: secondaryColor}}><span style={{color: 'white', fontWeight: 600}}>Pricing / RePricing</span></li>
                <li style={{color: secondaryColor}}><span style={{color: 'white', fontWeight: 600}}>Sorting Product</span></li>
                <li style={{color: secondaryColor}}><span style={{color: 'white', fontWeight: 600}}>Product Recall</span></li>
                <li style={{color: secondaryColor}}><span style={{color: 'white', fontWeight: 600}}>POM and GSL sorting</span></li>
                <li style={{color: secondaryColor}}><span style={{color: 'white', fontWeight: 600}}>Disposal</span></li>
                <li style={{color: secondaryColor}}><span style={{color: 'white', fontWeight: 600}}>Jobbing</span></li>
                <li style={{color: secondaryColor}}><span style={{color: secondaryColor, fontWeight: 600}}>We can arrange transport</span></li>
              </ul>
            </div>

            <div style={{position: 'relative', fontWeight: 600}}>
              <div>Get for a quote <span style={{color: secondaryColor,fontWeight: 700}}>today</span> using our digital portal.
              <br />We will get back to you with a complete breakdown.
              <br />And a price thats difficult to beat...
              </div>
            </div>

            <div style={{position: 'relative', paddingTop: 20}}>
              <button 
                style={{                       
                  background: secondaryColor,
                  outline: 'none',
                  border: 'none',
                  height: 80,
                  width: 250,
                  fontSize: 20,
                  padding: 5,
                  color: dominantColor,
                  borderRadius: 3,
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              ><strike>Create a Work Request</strike></button>
            </div>

            </div>

          <Hide hide={['mobile','tablet']} >
            <div style={{
              flex: '1 1 auto',
              padding: 10,
              margin: 10,
              textAlign: 'center',
              position: 'relative',
              alignSelf: 'center'
              }} >
              <img src={rework} alt={'arrow'} style={{maxWidth: '100%'}} />
            </div>
          </Hide>

 

          </div>
 )
};

export default ReWorks;