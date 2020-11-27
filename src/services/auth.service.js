import axios from "axios"

const API_URL = "http://localhost:8080/api/auth/"

const register = (firstname,surname,company,address,postcode,email,telephone,username,password) => {
  return axios.post(API_URL + "signup", {
    firstname,
    surname,
    company,
    address,
    postcode,
    email,
    telephone,
    username,
    password,
  })
}

const updatePassword = (email,password,oldPassword) => {
  return axios.post(API_URL + "updatepassword", {
    email,
    password,
    oldPassword
  })
}


const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data))
      }

      return response.data
    })
}

const logout = () => {
  localStorage.removeItem("user")
}

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"))
}

const obj = {
  register,
  login,
  logout,
  getCurrentUser,
  updatePassword
}

export default obj