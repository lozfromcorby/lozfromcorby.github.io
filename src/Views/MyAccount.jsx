import React, {useContext,useState,useEffect} from "react"
import AppContext from '../context'
import UserService from '../services/user.service'
import GridContainer from '../Layout/Grid/GridContainer'
import GridItem from "../Layout/Grid/GridItem"

const MyAccount = () => {
  const {currentUser,showAdminBoard,showModeratorBoard} = useContext(AppContext)
  const [myListings,setMyListings] = useState([])
  const [adminListnings,setAdminListings] = useState([])

  const handleCancel = (contractid,userid) => {
    UserService.cancelContract(contractid,userid)
    window.location.reload()
  }

  useEffect(() => {
    currentUser !== null && UserService.getPendingContracts(currentUser.id).then(
        (response) => {
          setMyListings(response.data);
        },
        (error) => {
          const _content =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
          setMyListings([]);
          console.log(_content)
        }
      );
  },[currentUser])

  useEffect(() => {
    showAdminBoard && currentUser !== null && UserService.getAllContracts().then(
        (response) => {
          setAdminListings(response.data);
        },
        (error) => {
          const _content =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
            setAdminListings([]);
          console.log(_content)
        }
      );
  },[currentUser,showAdminBoard])

  return (
    <GridContainer>
      <GridItem desktopWidth={12}>
        {'User: ' + (currentUser !== null)}

      </GridItem>
      {showAdminBoard &&
      <GridItem  desktopWidth={12}>
        Admin Board
      </GridItem>}
    </GridContainer>
  )
}

export default MyAccount