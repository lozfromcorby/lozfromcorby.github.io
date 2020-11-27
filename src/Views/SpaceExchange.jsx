import React, { useState, useContext, useEffect, memo } from "react";
import {FaThermometerHalf, FaSnowflake,FaTrashAlt,FaTrashRestore,FaRegHandPaper,FaTruckMoving,FaSellsy} from 'react-icons/fa'
import {BsArrowUp} from 'react-icons/bs'
import {TiWeatherPartlySunny} from 'react-icons/ti'
import AppContext from "../context";
import GridContainer from '../Layout/Grid/GridContainer'
import GridItem from '../Layout/Grid/GridItem'
import DigitalContract from '../Layout/DigitalContract'
import axios from 'axios'
import useGetPostCode from '../Hooks/useGetPostCode'
import UserService from "../services/user.service";
import {dominantColor,secondaryColor} from '../Layout/stylesheet'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)',
    borderRadius: 3,
    margin: 1,
    marginBottom: 3,
    textAlign: 'center',
    border: `1px solid ${dominantColor}`
  },
  root: {
    padding: 1,
    fontSize: 13
  },
  card: {
    background: 'white',
    color: dominantColor,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 2,
    width: '100%',
    height: 50,
  },
  content: {
    padding: 5
  }
}

const Redacted = memo((props) => {
  const {pending=false} = props
  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const styles = {
    root: {
      marginTop: 3,
      background: pending ? 'pink' : 'lightgrey',
      height: 18,
      width: pending ? '100%' : randomIntFromInterval(50,80),
      color: 'black',
      borderRadius: 5,
      fontSize: 10,
      fontWeight: 600,
      paddingTop: 3,
      paddingLeft: 0,
      paddingRight: 20,
      zIndex: 10
    }
  }
  return(
    <div style={styles.root} >{pending && 'Under Offer'}</div>
  )
})

const Listing = ({content,handleClick}) => {
  const {currentUser,browserLocation,getDistance,getBearing} = useContext(AppContext)
  let postcode = useGetPostCode(currentUser)
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
  
  let redact = currentUser === null
  
  return(
    <GridItem desktopWidth={12}>
    <div style={styles.container}>

    <GridItem desktopWidth={1.5}>
        <div style={styles.root}>
          <div style={styles.card}>
            <div style={{...styles.content,fontWeight: 600, fontSize: 17}}>{content.status === 'pending' ? <Redacted pending /> : redact ? <Redacted /> : content.company}</div>
          </div>
        </div>
      </GridItem>

      <GridItem desktopWidth={1.5}>
        <div style={styles.root}>
          <div style={styles.card}>
            <div style={styles.content}>{content.createddate}</div>
          </div>
        </div>
      </GridItem>

      <GridItem desktopWidth={1}>
        <div style={styles.root}>
          <div style={styles.card}>
            <div style={{...styles.content,textAlign: 'left', fontWeight: 600}}>
              {content.location}
              <div style={{fontSize: 10}} >
                ({isNaN(compareDistance)
                  ? browserDistanceComapre.toFixed(0)
                  : compareDistance.toFixed(0)} miles from {postcode.admin_district === undefined
                                                              ? ' current location'
                                                              : postcode.admin_district
                                                              })
              </div>
            </div>
            <div style={{position: 'absolute', marginLeft: 110}}>
                <BsArrowUp style={{fontSize: 28, color: dominantColor, transformOrigin: 'center center', transform: `rotate(${iconAngle.toFixed(0)}deg)`}} />
            </div>
          </div>
        </div>
      </GridItem>

      <GridItem desktopWidth={1}>
        <div style={styles.root}>
          <div style={{...styles.card, justifyContent: 'center'}}>
            <div style={{...styles.content,fontWeight: 600, fontSize: 17}}>{Number(content.palletequivalent).toLocaleString()}</div>
          </div>
        </div>
      </GridItem>

      <GridItem desktopWidth={1}>
        <div style={styles.root}>
          <div style={{...styles.card, justifyContent: 'center'}}>
            <div style={styles.content}>{redact ? <Redacted /> : content.spaceavailableuntil}</div>
          </div>
        </div>
      </GridItem>

      <GridItem desktopWidth={1}>
        <div style={styles.root}>
          <div style={{...styles.card, justifyContent: 'center'}}>
            <div style={styles.content}>
              {redact ? <Redacted />
                : content.spacetpye === 'ambient'
                ? <FaThermometerHalf style={{color: 'orange', fontSize: 22}} />
                : content.spacetpye === 'outdoors'
                ? <TiWeatherPartlySunny style={{color: 'purple', fontSize: 22}} />
                : <FaSnowflake style={{color: secondaryColor, fontSize: 22}} />}
            </div>
          </div>
        </div>
      </GridItem>

      <GridItem desktopWidth={1}>
        <div style={styles.root}>
          <div style={{...styles.card, justifyContent: 'flex-start'}}>
            <div style={styles.content}>
              {redact ? <Redacted />
              : content.extras.map(item => <span>
                {item === 'handball'
                  ? <FaRegHandPaper style={{color: dominantColor, fontSize: 22}} />
                  : item === 'disposal'
                  ? <FaTrashAlt style={{color: dominantColor, fontSize: 22}} />
                  : item === 'jobbing' 
                  ? <FaTrashRestore style={{color: dominantColor, fontSize: 22}} />
                  : item === 'transport'
                  ? <FaTruckMoving style={{color: dominantColor, fontSize: 22}} />
                  : item === '3PL'
                  ? <FaSellsy style={{color: dominantColor, fontSize: 22}} />
                  : item
                  } </span>
                  )}
              </div>
          </div>
        </div>
      </GridItem>

      <GridItem desktopWidth={1}>
        <div style={styles.root}>
          <div style={{...styles.card, justifyContent: 'center'}}>
            <div style={styles.content}>
              {redact ? <Redacted /> : 'In: £' + content.receivecostperpallet + ', Out: £' +  content.despatchcostperpallet + ', Store: £' +  content.costperpalletperweek}
            </div>
          </div>
        </div>
      </GridItem>

      <GridItem desktopWidth={1}>
        <div style={styles.root}>
          <div style={{...styles.card, justifyContent: 'center'}}>
            <div style={{...styles.content, fontSize: 20}}>{redact ? <Redacted /> : '£145,000'}</div>
          </div>
        </div>
      </GridItem>

      <GridItem desktopWidth={1}>
        <div style={styles.root}>
          <div style={{...styles.card, justifyContent: 'center'}}>
          <div style={{...styles.content, fontSize: 20, color: 'grey'}}>{redact ? <Redacted /> : '£300'}</div>
          </div>
        </div>
      </GridItem>

      <GridItem desktopWidth={1}>
        <div style={styles.root}>
          <div style={{...styles.card, justifyContent: 'center'}}>
            <div style={styles.content}>
              {redact ? <span style={{color: secondaryColor, fontWeight: 600}}>Log In to find out more!</span> :
                <button
                      onClick={() => handleClick(content)}
                      style={{
                        background: secondaryColor,
                        outline: 'none',
                        border: 'none',
                        padding: 10,
                        borderRadius: 3,
                        fontWeight: 600,
                        cursor: 'pointer'
                        }}
                    >
                    Interested
                    </button>}
            </div>
          </div>
        </div>
      </GridItem>

    </div>
  </GridItem>
  )
}

const Testing = () => {
  const {currentUser} = useContext(AppContext)
  const [content, setContent] = useState([]);
  const [interested,showInterested] = useState(false)
  const [contractContent,setContractContent] = useState([])
  const handleClick = (content) => {
    showInterested(true)
    setContractContent(content)
  }

  useEffect(() => {
    if(currentUser===null) {
      UserService.getPublicSpaceExchange().then(
        (response) => {
          setContent(response.data);
        },
        (error) => {
          const _content =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
          setContent([]);
          console.log(_content)
        }
      );
    } else {
      UserService.getUserSpaceExchange().then(
        (response) => {
          setContent(response.data);
        },
        (error) => {
          const _content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setContent([]);
          console.log(_content)
        }
      );
    }

  },[interested,currentUser])

  const headers = [
    {header: 'Company', width: 1.5},
    {header: 'Added Date', width: 1.5},
    {header: 'Location', width: 1},
    {header: 'Pallet Space', width: 1},
    {header: 'Available Until', width: 1},
    {header: 'Space Type', width: 1},
    {header: 'Site Features', width: 1},
    {header: 'Basic Costs', width: 1},
    {header: 'Estimated Total Cost', width: 1},
    {header: 'Our Fee', width: 1},
    {header: '', width: 1}
  ]

 return(
   <>
   <div style={{paddingTop: 10}}>
    <GridContainer>
        {headers.map((item,key) => (
          <GridItem desktopWidth={item.width}>
            <div style={styles.root}>
              <div style={{...styles.card,height: 25, fontWeight: 700,justifyContent: key > 2 && 'center'}}>
                <div style={styles.content}>{item.header}</div>
              </div>
            </div>
          </GridItem>
        ))}

      {content.map(item => (
        <Listing content={item} handleClick={handleClick} />
      ))}
    </GridContainer>
   </div>
   {interested && <DigitalContract contractContent={contractContent} showInterested={showInterested} />}
   </>
 )
};

export default Testing;