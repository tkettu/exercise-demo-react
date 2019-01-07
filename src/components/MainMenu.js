import React from 'react'

//import { connect } from 'react-redux'
import { Route, Link, Switch, withRouter, NavLink } from 'react-router-dom'
import { Dropdown, Menu } from 'semantic-ui-react'
import _ from 'lodash'

import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

import Home from './Home'
import Exercises from './Exercises'
import { userConstants } from '../constants/user.constants'
//import { changeSport  } from '../reducers/menuReducer'

import Logout from '../_helpers/Logout'
//import store from '../store';

const ExerciseMenu = () => (
  <Menu.Menu>

    <Menu.Item as={Link} to="/harjoitukset">
      harjoitukset
    </Menu.Item>
  </Menu.Menu>
)

const UserMenu = () => (
  <Menu.Menu position="right">
    <Menu.Item >
      {window.localStorage.getItem('user')}
    </Menu.Item>
    <Menu.Item as={Link} to="/logout" >
        kirjaudu ulos
    </Menu.Item>
  </Menu.Menu>
)

const options = [
  { key: 'ALL', text: 'Kaikki', value: ''  },
  { key: 'RUN', text: 'Juoksu', value: 'Juoksu' },
  { key: 'SKI', text: 'Hiihto', value: 'Hiihto' },
  { key: 'WAL', text: 'Kävely', value: 'Kävely' }
]

const Exercises2 = ({ match }) => (

  <Menu.Menu >
    <Dropdown item text='Harjoitukset'>
      <Dropdown.Menu>
        {_.map(options, ({ text }) => (
          <Dropdown.Item key={text} 
            as={Link} to={`/harjoitukset/laji/${text}`} 
           >
          {text}</Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>

  </Menu.Menu>
)
//TODO ROUTING TO /lajit/laji/{laji} that render by sport

const MainMenu = () => (
  <div>
    <Menu inverted>
      <Menu.Item as={Link} to="/" >
        koti
      </Menu.Item>
      {window.localStorage.getItem(userConstants.LOCAL_STORAGE) ?
          <React.Fragment>
            <ExerciseMenu />
            <Exercises2 /> 
            <UserMenu />
          </React.Fragment>
        :
        <Menu.Item position="right" as={Link} to="/login" >
          kirjaudu
        </Menu.Item>
      }
      
    </Menu>
    <div>
      <Switch>
        <Route exact path="/" render={() => <Home />} />
        <Route path="/login" render={({ history }) => <LoginForm history={history} />} />
        <Route path="/register" render={() => <RegisterForm />} />
        <Route path="/logout" render={() =>  <Logout /> } />

        {/*placeholders*/}
        <Route 
            path="/harjoitukset/laji/:sport?" 
            render={({match}) =>  
              <Exercises sport={match.params.sport} />
            }  />
        <Route  path="/harjoitukset" render={() => <Exercises />} />
      </Switch>
    </div> 
  </div>
)

export default MainMenu