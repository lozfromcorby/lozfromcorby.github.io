import React, { useState } from "react";
import AuthService from '../services/auth.service'

const Register = () => {

  const [state,setState] = useState({
      successful: false,
      message: ""
  })

  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  }

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleRegister = (e) => {
    e.preventDefault();

    setState({
      message: "",
      successful: false
    });

      AuthService.register(
        username,
        email,
        password
      ).then(
        response => {
          setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setState({
            successful: false,
            message: resMessage
          });
        }
      );
    
  }

  const [usenameWarn,setUsernameWarn] = useState('')
  const blurUsername = (e) => {
    e.target.value.length === 0 && setUsernameWarn('Field Required')
  }

    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

            {!state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    onBlur={blurUsername}
                    type="text"
                    className="form-control"
                    name="username"
                    value={username}
                    onChange={onChangeUsername}
                  />{blurUsername}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={onChangeEmail}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={onChangePassword}
                  />
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block" onClick={handleRegister}>Sign Up</button>
                </div>
              </div>
            )}

            {state.message && (
              <div className="form-group">
                <div
                  className={
                    state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {state.message}
                </div>
              </div>
            )}

        </div>
      </div>
    );
}

export default Register