import React, {useContext} from "react"
import AppContext from '../context'
import AuthService from "../services/auth.service"
import styles from "./stylesheet"

const Profile = () => {
  const {logOut,nameFormat,isProfileOpen,history,showAdminBoard,showModeratorBoard} = useContext(AppContext)
  const currentUser = AuthService.getCurrentUser();

  const handleClick = () => {
        isProfileOpen(false)
        window.location.href.slice(-7) === 'account' && history.push('/aboutus')
        setTimeout(() => { logOut() }, 500);
  }

  return (
    currentUser !== null &&
    <div style={{padding: 5, marginTop: -10}}>
      <header>
        <h3>
          <strong>{nameFormat(currentUser.firstname)}'s</strong> Profile
        </h3>
        <h5 style={{marginTop: -15}}>
          (Username: {currentUser.username})
        </h5>
      </header>
      <p>
        <strong>Name:</strong> {currentUser.firstname + ' ' + currentUser.surname} {showAdminBoard && '[Admin]'} {showModeratorBoard && '[Mod]'}
      </p>
      <p>
        <strong>Company:</strong> {currentUser.company}
      </p>
      <p>
        <strong>Location:</strong> {currentUser.address}
      </p>
      <p>
        <strong>email:</strong> {currentUser.email}
      </p>
      <p>
        <strong>Telephone:</strong> {currentUser.telephone}
      </p>

      {/*<div>Pending Contracts</div>
      {pending.map(item => (
        <li>{item.company} <span style={{fontSize: 10, color: 'crimson', cursor: 'pointer', fontWeight: 'bold'}} onClick={() => handleCancel(item._id,currentUser.id)}> (Cancel Contract)</span></li>
      ))}*/}

      <button style={styles.subscribeButton} onClick={() => handleClick()}>Log Out</button>
    </div>
  );
};

export default Profile