import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";

const BoardUser = () => {
  const [state,setState] = useState({
    content: ''
  })

  useEffect(() => {
    UserService.getAdminBoard().then(
      response => {
        setState({
          content: response.data
        });
      },
      error => {
        setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  },[])

    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{state.content}</h3>
        </header>
      </div>
    );
}

export default BoardUser