import React, {useContext} from "react"
import AppContext from '../context'
import PaypalButtons from './PaypalButtons'
import GridContainer from '../Layout/Grid/GridContainer'
import GridItem from '../Layout/Grid/GridItem'

const Testing = () => {
  const {basket,setBasket} = useContext(AppContext)

  const removeFromBasket = (val) => {
    let index = basket.findIndex(function(item, i){
      return item.name === val
    })
  
    let test = basket.filter((_, i) => i !== index)
    setBasket(test)
    localStorage.setItem("basket", JSON.stringify(test))
  }

  let orderTotal = basket.reduce((acc, item) => acc + Number(item.unit_amount.value), 0)

  return(
    <GridContainer>

    <GridItem desktopWidth={2}>
      <div>
          <h3>Basket</h3>
          <div style={{paddingBottom: 10}}>
            {basket.length === 0 ? 'Basket Empty' : basket.map((item,key) => (
              <div>{item.name}: £{Number(item.unit_amount.value).toFixed(2)} <button onClick={() => removeFromBasket(item.name)}>x</button></div>
            ))}
          </div>
            {basket.length === 0 ? '' : <div style={{paddingBottom: 10, fontWeight: 600}}>Order Total: £{orderTotal.toFixed(2)}</div>}
            {basket.length > 0 &&  <div><PaypalButtons basket={basket} orderTotal={orderTotal} /></div>}
      </div>
    </GridItem>

    </GridContainer>
  )

}

export default Testing