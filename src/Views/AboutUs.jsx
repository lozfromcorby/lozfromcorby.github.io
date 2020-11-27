import React from 'react'
import VerticalParallex from '../Layout/Parallax/VerticalParallex'
import HorizontalParallex from '../Layout/Parallax/HorizontalParallex'
import ParallaxSpeed from '../Layout/Parallax/ParallaxSpeed'

export default function App() {

  return (
    <>
      <ParallaxSpeed speed={1} xPosOffset={'-30%'} pauseLength={500} />
      <ParallaxSpeed speed={2} xPosOffset={'0%'} pauseLength={500} />
      <ParallaxSpeed speed={3} xPosOffset={'30%'} pauseLength={500} />

      <VerticalParallex xPosOffSet={'-25%'} yPos={'45%'} effectStart={1300} pauseLength={400} >
        <div style={{fontSize: 120, color: 'lightgrey'}}>
          Lawrence
        </div>
      </VerticalParallex>

      <VerticalParallex xPosOffSet={'-30%'} yPos={'40%'} effectStart={1200} pauseLength={700} >
        <div style={{fontSize: 140}}>
          Lawrence
        </div>
      </VerticalParallex>

      <HorizontalParallex inRight xPosOffset={'35%'} yPos='25%' appearAt={1400} disappearAt={2000} >
        <div style={{fontSize: 90,color: 'lightgrey'}}>
          Adam
        </div>
      </HorizontalParallex>
      <VerticalParallex xPosOffSet={'30%'} yPos={'20%'} effectStart={1400} pauseLength={600} >
        <div style={{fontSize: 90}}>
          Adam
        </div>
      </VerticalParallex>

      <HorizontalParallex xPosOffset={'-15%'} yPos='72%' appearAt={1400} disappearAt={2000} >
        <div style={{fontSize: 95,color: 'lightgrey'}}>
          Dan
        </div>
      </HorizontalParallex>
      <VerticalParallex xPosOffSet={'-10%'} yPos={'70%'} effectStart={1400} pauseLength={650} >
        <div style={{fontSize: 100}}>
        Dan
        </div>
      </VerticalParallex>

      <HorizontalParallex xPosOffset={'15%'} yPos='15%' appearAt={1500} disappearAt={2000} >
        <div style={{fontSize: 95,color: 'lightgrey'}}>
          Rob
        </div>
      </HorizontalParallex>
      <VerticalParallex xPosOffSet={'10%'} yPos={'20%'} effectStart={1500} pauseLength={650} >
        <div style={{fontSize: 100}}>
        Rob
        </div>
      </VerticalParallex>

      <div style={{height: 5000}} />  
    </>
  )
}
