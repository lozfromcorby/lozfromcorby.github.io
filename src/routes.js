import Testing from './Views/Testing'
import Basket from './Views/Basket'

const routes = [
    {
      path: '/comingsoon',
      name: 'Coming Soon',
      component: () => {return(<div style={{height: 650, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', fontWeight: 700}}>Website Coming January 2021<br />Visit us on eBay and Amazon Marketplace until then :)</div>)}
    },
    {
      path: '/testingpage',
      name: 'Shop Test',
      component: Testing
    },
    {
      path: '/Basket',
      name: 'Basket',
      component: Basket
    }
  ]

  export default routes