import React, { useState,useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";

import Header from './layout/Header'
import MenuItem from './layout/MenuItem'

const App = () => {
  const [state,setState] = useState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    })

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  },[])

  const logOut = () => {
    AuthService.logout();
  }

    const { currentUser, showModeratorBoard, showAdminBoard } = state;

    return (
      <>
      <Header>
          <div style={{
            paddingLeft: 5,
            alignSelf: 'center',
            color: 'white',
            fontSize: 28,
            whiteSpace: 'nowrap',
            cursor: 'default',
            fontWeight: 600
          }}>
            <span className="glitch" data-text="ダ Disrupters.uk">ダ Disrupters</span>
          </div>

          <div style={{
                    position: 'fixed',
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'nowrap',
                    justifyContent: 'center',
                    width: '100%',
                    transition: 'all 0.66s cubic-bezier(0.685, 0.0473, 0.346, 1)'
          }}>
            <MenuItem path={'/home'} title={'Home'} />
            <MenuItem path={'/whatsnew'} title={"What's New"} />
            {showModeratorBoard && <MenuItem path={'/mod'} title={"Moderator"} />}
            {showAdminBoard && <MenuItem path={'/admin'} title={"Admin"} />}
            {currentUser && <MenuItem path={'/user'} title={"User"} />}

          </div>

          {currentUser ? (
            <div style={{display: 'flex', flexDirection: 'row'}}>
              <MenuItem path={'/profile'} title={currentUser.username} />
              <div style={{display: 'flex', alignItems: 'center', padding: 0, position: 'relative', top: 3, left: -25}}>
                <a style={{color: 'white', fontSize: 12}} href="/" onClick={logOut}>(Log Out)</a>
              </div>
            </div>
          ) : (
            <div style={{display: 'flex', flexDirection: 'row'}}>
              <MenuItem path={'/login'} title={'Login'} />
              <MenuItem path={'/signup'} title={'Sign Up'} />
            </div>
          )}
        </Header>

        <div style={{paddingTop: 100}}>
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
          </Switch>
        </div>
      </>
    );
  
}

export default App;