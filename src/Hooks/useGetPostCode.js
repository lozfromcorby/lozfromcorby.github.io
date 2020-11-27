import {useState,useEffect} from 'react'
import axios from 'axios'

const useGetPostCode = (currentUser,) => {
    const [postCode,setPostCode] = useState('')

    useEffect(() => {
        currentUser !== null && axios.get(`https://api.postcodes.io/postcodes/${currentUser.postcode}`)
        .then(res => {
          const data = res.data;
          setPostCode(data.result);
        })
      },[currentUser])

      return(postCode)

}

export default useGetPostCode