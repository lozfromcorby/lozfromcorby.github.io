import React from "react";
import Hide from './Grid/Hide'
import curvedArrow from '../images/curved-arrow-with-broken-line.svg'
import forklift from '../images/forklift.svg'
import packages from '../images/packages.svg'
import shipping from '../images/shipping.svg'
import {dominantColor,secondaryColor} from './stylesheet'

const ReWorks = () => {
 return(
          <div style={{
            position: 'relative',
            background: dominantColor,
            color: 'white',
            width: '100%',
            height: 510,
            borderRadius: 3
          }}>

            <div style={{display: 'flex', justifyContent: 'flex-start', fontSize: 'calc(10px + 2vmin)', paddingLeft: 12, fontWeight: 700}}>
        Divert <span style={{color: secondaryColor}}>&nbsp;>&nbsp;</span> ReWork <span style={{color: secondaryColor}}>&nbsp;>&nbsp;</span> ReRoute
            </div>
            
            <div style={{paddingTop: 30, paddingLeft: 15}}>
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

          <Hide hide={['mobile','tablet']}>
            <div style={{position: 'absolute', top: 70, left: 430, display: 'flex', justifyContent: 'flex-end', alignContent: 'center'}}>
              <img src={curvedArrow} style={{maxHeight: '100%', minWidth: '100%', objectFit: 'cover', verticalAlign: 'bottom'}} alt="arrow" />
            </div>

            <div style={{position: 'absolute', top: 50, left: 390}}>
              <img src={forklift} height="100" alt="forklift" />
            </div>

            <div style={{position: 'absolute', top: 220, left: 525}}>
              <img src={packages} width="100" alt="packages" />
            </div>

            <div style={{position: 'absolute', top: 310, left: 740}}>
              <img src={shipping} width="100" alt="shipping" />
            </div>
          </Hide>

            <div style={{position: 'absolute', bottom: 20, left: 20}}>
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
              >Create a Work Request</button>
            </div>

            <div style={{position: 'absolute', fontWeight: 600, left: 20, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <div>Get for a quote <span style={{color: secondaryColor,fontWeight: 700}}>today</span> using our digital portal.
              <br />We will get back to you with a complete breakdown.
              <br />And a price thats difficult to beat...
              </div>
            </div>
          </div>
 )
};

export default ReWorks;