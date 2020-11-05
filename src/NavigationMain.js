import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute.component'
import AskForHelp from './pages/AskForHelp/AskForHelp.page'
import Home from './pages/Home/Home.page'
import Login from './pages/Login/Login.page'
import MyAccount from './pages/MyAccount/MyAccount.page'
import OfferHelp from './pages/OfferHelp/OfferHelp'
import Profile from './pages/Profile/Profile.page'
import ShowHelp from './pages/ShowHelp/ShowHelp'
import ShowHelpOffer from './pages/ShowHelpOffer/ShowHelpOffer.page'
import Signup from './pages/Signup/Signup.page'

function NavigationMain(props) {
  console.log(MyAccount)
  return (
    <Switch>
      <PrivateRoute exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <PrivateRoute exact path="/new" component={AskForHelp} />
      <PrivateRoute exact path="/account" component={MyAccount} />
      <PrivateRoute exact path="/user/:userId" component={Profile} />
      <PrivateRoute exact path="/help/:helpId" component={ShowHelp} />
      <PrivateRoute exact path="/help/:helpId/offer-help" component={OfferHelp} />
      <PrivateRoute exact path="/help/:helpId/help-offer/:helpOfferId" component={ShowHelpOffer} />
    </Switch>
  )
}

export default NavigationMain
