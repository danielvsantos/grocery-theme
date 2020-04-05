import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'
// Your component pages
import Preferencias from './components/Preferencias'

const MyPreferencesPage = () => (
  <Fragment>
    <Route exact path="/preferencias" component={Preferencias} />
  </Fragment>
)

export default MyPreferencesPage
