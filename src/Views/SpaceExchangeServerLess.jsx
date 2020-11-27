import React, { useState, useContext, useEffect } from "react";
import SingleListing from '../Layout/SingleListing'
import AppContext from "../context";
import GridContainer from '../Layout/Grid/GridContainer'
import GridItem from '../Layout/Grid/GridItem'
import Hide from '../Layout/Grid/Hide'
import DigitalContract from '../Layout/DigitalContract'
import styles from '../Layout/stylesheet'
import useGetPostCode from '../Hooks/useGetPostCode'

const SpaceExchange = () => {
  const {currentUser,nameFormat,isLoading,db} = useContext(AppContext)
  const [content, setContent] = useState([]);
  const [palletsToStore,setPalletsToStore] = useState('')
  const [contractLength,setContractLength] = useState('')
  const [interested,showInterested] = useState(false)
  const [contractContent,setContractContent] = useState([])
  const handleClick = (content) => {
    showInterested(true)
    setContractContent(content)
  }

let postcode = useGetPostCode(currentUser)

  const handlePallet = (e) => {
      setPalletsToStore(e.target.value)
  }

  const handleContract = (e) => {
      setContractLength(e.target.value)
  }

  useEffect(() => {
    console.log(currentUser===null)
    if(currentUser===null) {
            db
            .collection("listings")
            .find({}, {projection: {'company': 0}})
            .asArray()
            .then(res => { setContent(res); console.log(res) } )
    } else {
          db
            .collection("listings")
            .find({})
            .asArray()
            .then(res => { setContent(res) } )
    }

  },[interested,currentUser,db])

  return (
    <>
    <div style={{fontSize: 12}}>
        <GridContainer justify={'space-between'}>
          <GridItem desktopWidth={12}>
            <header>
              <h3>{isLoading ? 'Loading...' : 'Welcome back, ' + nameFormat(currentUser === null ? '' : currentUser.username)}</h3>
            </header>
          </GridItem>
          <GridItem desktopWidth={12}>
              <GridItem desktopWidth={12}>
              <div style={{paddingBottom: 10}} >
              Quick Maths: {currentUser === null ? <span style={{fontWeight: 600}}>Log in to estimate costs!</span> :
              <div>
              I am looking to store <input style={{...styles.subscribeInput,marginLeft: 10, marginRight: 10, width: 40, marginBottom: 5}} type="text" name="palletstostore" onChange={handlePallet} value={palletsToStore} /> pallets
              for around<input style={{...styles.subscribeInput,marginLeft: 10,width: 40}} type="text" name="contractlength" onChange={handleContract} value={contractLength} /> weeks
              </div>}
              </div>
              </GridItem>
          </GridItem>
          <GridItem desktopWidth={0.92} mobile={3}>
            Company
          </GridItem>
          <GridItem desktopWidth={0.92} mobile={3}>
            Location
          </GridItem>
          <GridItem desktopWidth={0.92} mobile={3}>
            Pallets
          </GridItem>

          <Hide hide={['mobile','tablet']}>
            <GridItem desktopWidth={0.92}>
              Min. Contract Length
            </GridItem>
            <GridItem desktopWidth={0.92}>
              Available Until
            </GridItem>
            <GridItem desktopWidth={0.92}>
              Type
            </GridItem>
            <GridItem desktopWidth={0.92}>
              Receive
            </GridItem>
            <GridItem desktopWidth={0.92}>
              Descpatch
            </GridItem>
            <GridItem desktopWidth={0.92}>
              Storage
            </GridItem>
          </Hide>

            <GridItem desktopWidth={0.92} mobile={3}>
              Estimated Cost
            </GridItem>   
            <Hide hide={['mobile','tablet']}>      
            <GridItem desktopWidth={0.92} mobile={3}>
              Our Fee
            </GridItem>
            {currentUser !== null && <GridItem desktopWidth={0.92} mobile={3}>I'm interested</GridItem>}
            </Hide>
        
        </GridContainer>

    {content === 'Request failed with status code 404' || content === 'Network Error'
      ? <GridContainer>
            <GridItem desktopWidth={12}>Database Connection Error!</GridItem>
        </GridContainer>
      : content.map((item,key) => (
        <SingleListing
          key={key}
          content={item}
          showInterested={showInterested}
          palletsToStore={palletsToStore}
          contractLength={contractLength}
          postcode={postcode}
          handleClick={handleClick}
          />
          
    ))}
    </div>
    {interested && <DigitalContract contractContent={contractContent} showInterested={showInterested} />}
    </>
  );
};

export default SpaceExchange;