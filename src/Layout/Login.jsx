import React, { useState, useContext, useRef } from "react";
import AppContext from "../context";
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'
import AuthService from '../services/auth.service'
import styles from './stylesheet'
import {FaUser} from 'react-icons/fa'
import {secondaryColor} from './stylesheet'

const required = (value) => {
  if (!value) {
    return (
      <div>
        This field is required!
      </div>
    )
  }
}

const Login = () => {
  const {isProfileOpen,history,loadingcogs} = useContext(AppContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const form = useRef()
  const checkBtn = useRef()

  const handleClick = (url) => {
    isProfileOpen(false)
    setTimeout(() => {
      history.push(url)
    }, 500)
  }

  const onChangeUsername = (e) => {
    const username = e.target.value
    setUsername(username)
  }

  const onChangePassword = (e) => {
    const password = e.target.value
    setPassword(password)
  }

  const handleLogin = (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    form.current.validateAll()

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username.toLowerCase(), password).then(
        () => {
          isProfileOpen(false)
          window.location.href.slice(-7) === 'aboutus' && history.push('/account')
          window.location.href.slice(-10) === 'newaccount' && history.push('/account')
          window.location.reload()
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()

          setMessage(resMessage)
          setLoading(false)
        }
      )
    } else {
      setLoading(false)
    }
  }

  return (loading ? <div style={{display: 'flex', justifyContent: 'center'}}><img style={{paddingTop: '30%'}} src={loadingcogs} alt='loading' /></div>:
    <div>

    <div style={{position: 'absolute', top: 5, right: 5}}>
    <button onClick={() => isProfileOpen(false)} className={`hamburger hamburger--elastic ${'is-active'}`} type="button">
        <span className="hamburger-box">
            <span className="hamburger-inner"></span>
        </span>
    </button>
    </div>

      <div style={{position: 'relative', top: 50, textAlign: 'center'}}>
        <FaUser style={{fontSize: 42}} />
        <Form onSubmit={handleLogin} ref={form}>
          <div style={{padding: 10}}>
            <label htmlFor='username'>Username</label>
            <Input
              type='text'
              name='username'
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
              style={styles.subscribeInput}
            />
          </div>

          <div>
            <label htmlFor='password'>Password</label>
            <Input
              type='password'
              name='password'
              value={password}
              onChange={onChangePassword}
              validations={[required]}
              style={styles.subscribeInput}
            />
          </div>

          <div style={{paddingTop: 15}}>
            <button style={{...styles.subscribeButton,width: 80}} disabled={loading} >
              {loading && (
                <span></span>
              )}
              <span>Login</span>
            </button>
          </div>

          {message && (
            <div>
              <div style={{color: 'crimson', paddingTop: 5, fontWeight: 600}}>
                {message + '!'}
              </div>
            </div>
          )}

          <CheckButton style={{ display: 'none' }} ref={checkBtn} />
        </Form>
        <br />
          <span style={{color: secondaryColor, fontWeight: '600',position: 'relative', cursor: 'pointer', bottom: 2, left: 0, textAlign: 'center', width: '100%'}} onClick={() => handleClick('/account')}>No Account? Create one here!</span>
      </div>
    </div>
  )
}

export default Login