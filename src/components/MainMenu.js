import React from 'react'

import { Route, Link, NavLink } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

import Home from './Home'
import Exercises from './Exercises'
import Tab2 from './Tab2'
import Tab3 from './Tab3'
import { userConstants } from '../constants/user.constants';
import Logout from '../_helpers/Logout';


const UserMenu = () => (
  <Menu.Menu position="right">
    <Menu.Item>
      {JSON.parse((window.localStorage
        .getItem(userConstants.LOCAL_STORAGE))).username}
    </Menu.Item>
    <Menu.Item as={Link} to="/logout" >
        logout
    </Menu.Item>
  </Menu.Menu>
)


const MainMenu = () => (
  <div>
    <Menu inverted>
      <Menu.Item as={Link} to="/" >
        home
      </Menu.Item>
      <Menu.Item as={Link} to="/exercises" >
        Exercises
      </Menu.Item>
      <Menu.Item as={Link} to="/tab2" >
        T2
      </Menu.Item>
      <Menu.Item as={Link} to="/tab3" >
        T3
      </Menu.Item>
      

      {window.localStorage.getItem(userConstants.LOCAL_STORAGE) ? 
        <UserMenu />
        :
        <Menu.Item position="right" as={Link} to="/login" >
        login
        </Menu.Item>
      }
      
    </Menu>
    <div>
      <Route exact path="/" render={() => <Home />} />
      <Route path="/login" render={({ history }) => <LoginForm history={history} />} />
      <Route path="/register" render={() => <RegisterForm />} />
      <Route path="/logout" render={() =>  <Logout /> } />

      {/*placeholders*/}
      <Route path="/exercises" render={() => <Exercises />} />
      <Route path="/tab2" render={() => <Tab2 />} />
      <Route path="/tab3" render={() => <Tab3 />} />
    </div> 
  </div>
)

export default MainMenu