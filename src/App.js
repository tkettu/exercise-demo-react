import React, { Component } from 'react'
import { connect } from 'react-redux'
import {  Router } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import { history } from './_helpers/history'
import MainMenu from './components/MainMenu'
import { clearMsg } from './reducers/messageReducer'


class App extends Component {
  constructor(props) {
    super(props)

    history.listen((location, action) => {
      props.clearMsg()
    })
  }

  render() {
    return (
      <Container fluid>   
        <Router history={history}>
          <MainMenu />
        </Router>
      </Container>
    )
  }
}

export default connect(
  null,
  { clearMsg }
)(App)
