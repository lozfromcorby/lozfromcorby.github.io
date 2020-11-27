import React, {useState,useContext,useEffect,memo} from "react";
import AppContext from '../context'
import axios from 'axios'
import {FaThermometerHalf, FaSnowflake} from 'react-icons/fa'
import {BsArrowUp} from 'react-icons/bs'
import {TiWeatherPartlySunny} from 'react-icons/ti'
import GridContainer from './Grid/GridContainer'
import GridItem from './Grid/GridItem'
import Hide from './Grid/Hide'
import styles, {secondaryColor} from './stylesheet'

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

const SingleListing = ({content,palletsToStore,contractLength,postcode,handleClick}) => {

  const {browserLocation,getDistance,getBearing} = useContext(AppContext)
  const [listingPostcode,setListingPostcode] = useState([])

  useEffect(() => {
      content !== undefined && axios.get(`https://api.postcodes.io/postcodes/${content.postcode}`)
    .then(res => {
      const data = res.data;
      setListingPostcode(data.result);
    })
  },[content])


  let compareDistance = getDistance(postcode.latitude, postcode.longitude, listingPostcode.latitude,listingPostcode.longitude, "M")*1.36
  let browserDistanceComapre = getDistance(browserLocation.latitude, browserLocation.longitude, listingPostcode.latitude,listingPostcode.longitude, "M")*1.36

  let iconAngle = getBearing(browserLocation.latitude, browserLocation.longitude, listingPostcode.latitude,listingPostcode.longitude)

  const storageCost =
      (palletsToStore*content.receivecostperpallet)
      + (palletsToStore*content.costperpalletperweek)
      + ((palletsToStore*content.costperpalletperweek) * contractLength)

  const feeCalc = ((palletsToStore*content.receivecostperpallet)
  + (palletsToStore*content.costperpalletperweek)
  + ((palletsToStore*content.costperpalletperweek)))*0.01 * (contractLength/10)

  const feeCap = 150
  const ourFee = feeCalc > feeCap ? feeCap : feeCalc

  const totalCost = storageCost + feeCap
  
  return (
    <div onClick={content.company === undefined ? null : () => handleClick(content)} >
    <GridContainer justify={'space-between'}>
          <GridItem desktopWidth={0.92} mobile={3}>{content.status === 'pending' ? <Redacted pending/> : content.company === undefined ? <Redacted /> : content.company}</GridItem>
          <GridItem desktopWidth={0.92} mobile={3}>{content.location}         <span><BsArrowUp style={{color: 'hotpink',transform: `rotate(${iconAngle.toFixed(0)}deg)`}} /></span>
          <div style={{fontSize: 8}} mobile={3}>({isNaN(compareDistance) ? browserDistanceComapre.toFixed(0) : compareDistance.toFixed(0)} miles from {postcode.admin_district === undefined ? ' current location' : postcode.admin_district})</div>
          </GridItem>
          <GridItem desktopWidth={0.92} mobile={3}>{content.palletequivalent}</GridItem>
        <Hide hide={['mobile','tablet']}>
          <GridItem desktopWidth={0.92}>{content.contractlength + ' weeks'}</GridItem>
          <GridItem desktopWidth={0.92}>{content.company === undefined ? <Redacted /> : content.spaceavailableuntil}</GridItem>
          <GridItem desktopWidth={0.92}>
              {content.company === undefined ? <Redacted /> :
              content.spacetpye === 'ambient' ? <FaThermometerHalf style={{color: 'orange', fontSize: 22}} /> : content.spacetpye === 'outdoors' ? <TiWeatherPartlySunny style={{color: 'purple', fontSize: 22}} /> : <FaSnowflake style={{color: secondaryColor, fontSize: 22}} />}
          </GridItem>
          <GridItem desktopWidth={0.92}>{content.company === undefined ? <Redacted /> : '£' + content.receivecostperpallet}</GridItem>
          <GridItem desktopWidth={0.92}>{content.company === undefined ? <Redacted /> : '£' + content.despatchcostperpallet}</GridItem>
          <GridItem desktopWidth={0.92}>{content.company === undefined ? <Redacted /> : '£' + content.costperpalletperweek}</GridItem>
        </Hide>  
          <GridItem desktopWidth={0.92} mobile={3}>{content.company === undefined ? <Redacted /> : '£' + ((palletsToStore === '' || contractLength === '') ? 0 : totalCost).toLocaleString()} {content.company === undefined ? '' : '(£' + ((palletsToStore === '' || contractLength === '') ? 0 : ((totalCost/contractLength)/palletsToStore).toFixed(2)) + ')'}</GridItem>
        <Hide hide={['mobile','tablet']}>  
          <GridItem desktopWidth={0.92} mobile={3}>{content.company === undefined ? <Redacted /> : '£' + ourFee.toFixed(2)}</GridItem>
          <GridItem desktopWidth={0.92} mobile={3}>
            {content.company !== undefined && content.status !== 'pending'
              && <button style={styles.subscribeButton} onClick={() => handleClick(content)}>I'm interested</button>}
          </GridItem>
        </Hide> 
    </GridContainer>
    </div>
  );
};

export default SingleListing;