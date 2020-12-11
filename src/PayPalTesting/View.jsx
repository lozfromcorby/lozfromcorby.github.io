import React, {useContext,useEffect} from "react"
import AppContext from '../context'
import GridContainer from '../Layout/Grid/GridContainer'
import GridItem from '../Layout/Grid/GridItem'
import {
  Stitch,
  RemoteMongoClient
} from "mongodb-stitch-browser-sdk";

const Testing = () => {
  const {basket,setBasket,content,setContent} = useContext(AppContext)

  useEffect(() => {
    let client = !Stitch.hasAppClient('rupt-udddb') ? Stitch.initializeDefaultAppClient('rupt-udddb') : Stitch.defaultAppClient
    let mongodb = client.getServiceClient(
      RemoteMongoClient.factory,
      "mongodb-atlas"
    );
    let db = mongodb.db('Rupt')
    db
    .collection("stockfile")
    .find({})
    .asArray()
    .then(res => { setContent(res); } )
  },[setContent])


  const addToBasket = (e) => {
    let item = {
      name: e.target.name,
      unit_amount: {value: e.target.value, currency_code: 'GBP'},
      quantity: '1',
      sku: e.target.id,
    }
    setBasket([...basket,item])
    localStorage.setItem("basket", JSON.stringify([...basket,item]))
  }

  return(
    <GridContainer>

    {content.map(item => (
      <GridItem desktopWidth={2}>
        <h3> {item.description} </h3>
        <div style={{width: 200, height: 200, background: 'grey', borderRadius: 3}} />
          <h3>
            <b>£{`${Number(item.value || 0).toFixed(2)}`}</b>
          </h3>
        <button id={item.sku} name={item.description} value={`${item.value}`} onClick={addToBasket}> Add to Basket </button>
      </GridItem>
    ))}

    </GridContainer>
  )

}

export default Testing