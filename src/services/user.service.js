import axios from "axios"
import authHeader from "./auth-header"

const API_URL = "http://localhost:8080/api/user/"

const checkApiConnection = () => {
  return axios.get('http://localhost:8080/')
}

const getPublicContent = () => {
  return axios.get(API_URL + "all")
}

const getPublicSpaceExchange = () => {
  return axios.get(API_URL + "publicspaceexchange")
}

const getUserSpaceExchange = () => {
  return axios.get(API_URL + "userspaceexchange", { headers: authHeader() })
}

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() })
}

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() })
}

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() })
}

const getPendingContracts = (id) => {
  return axios.post(API_URL + "pendingcontracts",
    {id},
    {headers: authHeader()}
  )
}

const getAllContracts = () => {
  return axios.get(API_URL + "getallcontracts", {headers: authHeader()}) 
}

const initiateContract = (id,status,userid) => {
  return axios.post(API_URL + 'initiate', {
    id,
    status,
    userid
  }, { headers: authHeader() })
}

const cancelContract = (contractid,userid) => {
  return axios.post(API_URL + "cancelcontract",
      {
        contractid,
        userid
      },
      {headers: authHeader()}
    )
}

const obj = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  getPendingContracts,
  cancelContract,
  checkApiConnection,
  initiateContract,
  getPublicSpaceExchange,
  getUserSpaceExchange,
  getAllContracts
}

export default obj