import React, { useState, useContext, useEffect } from "react";
import axios from 'axios'
import SingleListing from '../Layout/SingleListing'
import AppContext from "../context";
import GridContainer from '../Layout/Grid/GridContainer'
import GridItem from '../Layout/Grid/GridItem'
import Hide from '../Layout/Grid/Hide'
import UserService from "../services/user.service";

const Home = () => {
  const {isLoading,currentUser,isProfileOpen} = useContext(AppContext)
  const [content, setContent] = useState([]);
  const [postcode,setPostcode] = useState([])
  
  useEffect(() => {
    currentUser !== null && axios.get(`https://api.postcodes.io/postcodes/${currentUser.postcode}`)
    .then(res => {
      const data = res.data;
      setPostcode(data.result);
    })

  },[currentUser])

  useEffect(() => {
    UserService.getPublicContent().then(
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
  }, []);

  return (
    <div style={{fontSize: 12}}>
    <GridContainer>
          <GridItem desktopWidth={12}>
            <header>
            <h3>{isLoading ? 'Loading...' : `There are currently ${content.length} listings avialable`}</h3>
            </header>
          </GridItem>

          <GridItem desktopWidth={12}>
          <div style={{paddingBottom: 20}}>
            <span style={{fontWeight: 'bold', cursor: 'pointer'}} onClick={() => isProfileOpen(true)}>Log In</span> in for more detailed infomation or to make an enquiry
          </div>
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
            <GridItem desktopWidth={0.92}>
              Our Fee
            </GridItem>   
          </Hide>

            <GridItem desktopWidth={0.92} mobile={3}>
              Estimated Cost
            </GridItem>         
    </GridContainer>

    {content.map((item,key) => (
      <SingleListing key={key} content={item} palletsToStore={''} contractLength={''} postcode={postcode} />
    ))}

    </div>
  );
};

export default Home;