import {useState,useEffect} from 'react'

const usePosition = () => {
    const [position, setPosition] = useState({});
    
    useEffect(() => {
      const getMyLocation = () => {
        const location = window.navigator && window.navigator.geolocation
        if (location) {
          location.getCurrentPosition((position) => {
            setPosition({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            })
          }, (error) => {
            setPosition({ latitude: 'err-latitude', longitude: 'err-longitude' })
          })
        }
      }
      getMyLocation()
    },[])

    return position  
}

export default usePosition