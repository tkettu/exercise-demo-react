import React from 'react'

//import { connect } from 'react-redux'
import { Route, Link, Switch, withRouter, NavLink } from 'react-router-dom'
import { Dropdown, Menu, Grid } from 'semantic-ui-react'
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
      Harjoitukset
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

  <Menu.Menu>
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

const MobileMenu = () => (
   <Menu inverted>
       <Menu.Item as={Link} to="/" >
        Koti
      </Menu.Item>
      {window.localStorage.getItem(userConstants.LOCAL_STORAGE) ?
      <Menu.Menu position='right'>
        <Dropdown item  >
          <Dropdown.Menu >

            <Dropdown.Item key='exercises' as={Link} to='/harjoitukset'>
              Harjoitukset
            </Dropdown.Item>
            <Dropdown.Item key='logout' as={Link} to='/logout'>
              Kirjaudu ulos
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
      :
      <Menu.Item position="right" as={Link} to="/login" >
        kirjaudu
      </Menu.Item>
      }
   </Menu> 
)

const AppMenu = () => (
    <Menu inverted>
      <Menu.Item as={Link} to="/" >
        Koti
      </Menu.Item>
      {window.localStorage.getItem(userConstants.LOCAL_STORAGE) ?
          <React.Fragment>
            <ExerciseMenu />
            {/* <Exercises2 />  */}
            <UserMenu />
          </React.Fragment>
        :
        <Menu.Item position="right" as={Link} to="/login" >
          kirjaudu
        </Menu.Item>
      }
      
    </Menu>

)

const MainMenu = () => (
  <div>
    <Grid>
      <Grid.Column
        only='mobile'
        width={16}
      >
       {MobileMenu()}
      </Grid.Column> 
      <Grid.Column
        width={16}
        only='computer'
        >
       {AppMenu()}
      </Grid.Column>
      <Grid.Column
        width={16}
        only='tablet'
        >
       {AppMenu()}
      </Grid.Column>
    </Grid>
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