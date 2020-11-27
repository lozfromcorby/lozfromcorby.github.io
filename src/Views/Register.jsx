import React, { useState, useRef } from 'react'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'
import { isEmail } from 'validator'
import AuthService from '../services/auth.service'
import GridContainer from '../Layout/Grid/GridContainer'
import GridItem from '../Layout/Grid/GridItem'

const nameFormat = (val) => {
  return val.toLowerCase().split(" ").map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(" ")
}

const required = (value) => {
  if (!value) {
    return (
      <div className='alert alert-danger' role='alert'>
        This field is required!
      </div>
    )
  }
}

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className='alert alert-danger' role='alert'>
        This is not a valid email.
      </div>
    )
  }
}

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className='alert alert-danger' role='alert'>
        The username must be between 3 and 20 characters.
      </div>
    )
  }
}

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className='alert alert-danger' role='alert'>
        The password must be between 6 and 40 characters.
      </div>
    )
  }
}

const vpostcode = (postcode) => {
  postcode = postcode.replace(/\s/g, "");
  let regex = /^[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}$/i;

  if (!regex.test(postcode)) {
    return(
      <div className='alert alert-danger' role='alert'>
        Invalid Postcode
      </div>
    )
  }

}


const Register = (props) => {
  const form = useRef()
  const checkBtn = useRef()
  const [firstname,setFirstname] = useState('')
  const [surname,setSurname] = useState('')
  const [company,setCompany] = useState('')
  const [address,setAddress] = useState('')
  const [postcode,setPostcode] = useState('')
  const [email,setEmail] = useState('')
  const [telephone,setTelephone] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const [successful, setSuccessful] = useState(false)
  const [message, setMessage] = useState('')

  const onChangeFirstname = (e) => {
    const firstname = e.target.value
    setFirstname(firstname)
  }

  const onChangeSurname = (e) => {
    const surname = e.target.value
    setSurname(surname)
  }

  const onChangeCompany = (e) => {
    const company = e.target.value
    setCompany(company)
  }

  const onChangeAddress = (e) => {
    const address = e.target.value
    setAddress(address)
  }

  const onChangePostcode = (e) => {
    const postcode = e.target.value
    setPostcode(postcode)
  }

  const onChangeTelephone = (e) => {
    const telephone = e.target.value
    setTelephone(telephone)
  }

  const onChangeUsername = (e) => {
    const username = e.target.value
    setUsername(username)
  }

  const onChangeEmail = (e) => {
    const email = e.target.value
    setEmail(email)
  }

  const onChangePassword = (e) => {
    const password = e.target.value
    setPassword(password)
  }

  const handleRegister = (e) => {
    e.preventDefault() 
    setMessage('')
    setSuccessful(false)

    form.current.validateAll()   

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(
        nameFormat(firstname),
        nameFormat(surname),
        nameFormat(company),
        nameFormat(address),
        postcode,
        email,
        telephone,
        username.toLowerCase(),
        password
        ).then(
        (response) => {
          setMessage(response.data.message)
          setSuccessful(true)
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()

          setMessage(resMessage)
          setSuccessful(false)
        }
      )
    }
  }

  return (
    <GridContainer>
      <GridItem>
        <div style={{padding: 10}}>
        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>

              <div>
                <label htmlFor='firstname'>First Name</label>
                <Input
                  type='text'
                  name='firstname'
                  value={firstname}
                  onChange={onChangeFirstname}
                  validations={[required]}
                />
              </div>

              <div>
                <label htmlFor='surname'>Surname</label>
                <Input
                  type='text'
                  name='surname'
                  value={surname}
                  onChange={onChangeSurname}
                  validations={[required]}
                />
              </div>

              <div>
                <label htmlFor='company'>Company</label>
                <Input
                  type='text'
                  name='company'
                  value={company}
                  onChange={onChangeCompany}
                  validations={[required]}
                />
              </div>

              <div>
                <label htmlFor='address'>First Line of Address</label>
                <Input
                  type='text'
                  name='address'
                  value={address}
                  onChange={onChangeAddress}
                  validations={[required]}
                />
              </div>

              <div>
                <label htmlFor='postcode'>Postcode</label>
                <Input
                  type='text'
                  name='postcode'
                  value={postcode}
                  onChange={onChangePostcode}
                  validations={[required,vpostcode]}
                />
              </div>

              <div>
                <label htmlFor='telephone'>Contact Number</label>
                <Input
                  type='text'
                  name='telephone'
                  value={telephone}
                  onChange={onChangeTelephone}
                />
              </div>

              <div>
                <label htmlFor='email'>Email</label>
                <Input
                  type='text'
                  name='email'
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>

              <div>
                <label htmlFor='username'>Choose Username</label>
                <Input
                  type='text'
                  name='username'
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, vusername]}
                />
              </div>

              <div>
                <label htmlFor='password'>Password</label>
                <Input
                  type='password'
                  name='password'
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>

              <div>
                <button>Sign Up</button>
              </div>
            </div>
          )}

          {message && (
            <div>
              <div
                role='alert'
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: 'none' }} ref={checkBtn} />
        </Form>
        </div>
      </GridItem>
  
    </GridContainer>
  )
}

export default Register