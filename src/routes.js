import AboutUs from './Views/AboutUs'
import Register from './Views/Register'
import Support from './Views/Support'
import AuthService from './services/auth.service'
import MyAccount from './Views/MyAccount'
import SpaceExchange from './Views/SpaceExchange'
import ReWork from './Views/ReWork'
import NewsBlog from './Views/NewsBlog'
import Testing from './Views/Testing'

const currentUser = AuthService.getCurrentUser();
const isAdmin = currentUser === null ? false : currentUser.roles.includes('ROLE_ADMIN')
const isMod = currentUser === null ? false : currentUser.roles.includes('ROLE_MODERATOR')

const routes = [
    /*{
      path: '/aboutus',
      name: 'About Us',
      component: AboutUs
    },
    {
      path: '/spaceexchange',
      name: 'Space Exchange',
      component: SpaceExchange
    },*/
    {
      path: '/rework',
      name: 'Coming Soon',
      component: ReWork
    },
    /*{
      path: '/newsblog',
      name: 'News & Blog',
      component: NewsBlog
    },
    {
      path: '/support',
      name: 'Support',
      component: Support
    },
    {
      path: '/testingpage',
      name: 'Testing',
      component: Testing
    },
    {
      path: '/account',
      name: currentUser === null ? 'Create Account' : isMod ? 'Moderator' : isAdmin ? 'Admin' : 'My Account',
      component: currentUser === null ? Register : MyAccount
    },*/
  ]

  export default routes