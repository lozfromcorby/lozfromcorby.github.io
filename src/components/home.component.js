import React, { useState, useEffect } from "react";
import UserService from '../services/user.service'
import  SimpleFileUpload  from 'react-simple-file-upload'

const Home = () => {
  const [state,setState] = useState({
    content: ''
  })

  useEffect(() => {
    UserService.getPublicContent().then(
      response => {
        setState({
          content: response.data
        });
      },
      error => {
        setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  },[])

  function handleFile(url){
    console.log('The URL of the file is ' + url)
  }

    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{state.content}</h3>
        </header>

        <input type="file" name="avatar_url" id="avatar_url" />
        <input type="hidden" id="avatar_url" name="avatar_url" value="https://files.simplefileupload.com/randomstring/filename.png"></input>
      </div>
    );
}

export default Home