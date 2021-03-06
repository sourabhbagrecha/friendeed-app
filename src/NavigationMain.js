import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute.component'
import AskForHelp from './pages/AskForHelp/AskForHelp.page'
import Home from './pages/Home/Home.page'
import Landing from './pages/Landing/Landing.page'
import MyAccount from './pages/MyAccount/MyAccount.page'
import OfferHelp from './pages/OfferHelp/OfferHelp'
import Profile from './pages/Profile/Profile.page'
import ShowHelp from './pages/ShowHelp/ShowHelp'
import ShowHelpOffer from './pages/ShowHelpOffer/ShowHelpOffer.page'

function NavigationMain(props) {
  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <PrivateRoute exact path="/home" component={Home} />
      <PrivateRoute exact path="/new" component={AskForHelp} />
      <PrivateRoute exact path="/account" component={MyAccount} />
      <PrivateRoute exact path="/user/:userId" component={Profile} />
      <PrivateRoute exact path="/help/:helpRequestId" component={ShowHelp} />
      <PrivateRoute exact path="/help/:helpRequestId/offer-help" component={OfferHelp} />
      <PrivateRoute exact path="/help/:helpRequestId/help-offer/:helpOfferId" component={ShowHelpOffer} />
    </Switch>
  )
}

export default NavigationMain
