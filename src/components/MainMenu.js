import React from 'react'

import { Route, Link, NavLink, Switch } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

import Home from './Home'
import Exercises from './Exercises'
import Tab2 from './Tab2'
import Tab3 from './Tab3'
import { userConstants } from '../constants/user.constants'
import Logout from '../_helpers/Logout'

const ExerciseMenu = () => (
  <Menu.Menu>

    <Menu.Item as={Link} to="/exercises">
      harjoitukset
    </Menu.Item>
  </Menu.Menu>
)

const UserMenu = () => (
  <Menu.Menu position="right">
    <Menu.Item >
      {JSON.parse((window.localStorage
        .getItem(userConstants.LOCAL_STORAGE))).username}
    </Menu.Item>
    <Menu.Item as={Link} to="/logout" >
        kirjaudu ulos
    </Menu.Item>
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
            <ExerciseMenu />,
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
        <Route exact
            path="/harjoitukset/laji/:sport?" 
            render={({match}) =>  
              <Exercises sport={match.params.sport} />
            }  />
        <Route  path="/harjoitukset" render={() => <Exercises />} />
        <Route path="/tab2" render={() => <Tab2 />} />
        <Route path="/tab3" render={() => <Tab3 />} />

      </Switch>
    </div> 
  </div>
)

export default MainMenu