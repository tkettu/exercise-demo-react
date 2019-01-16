import React from 'react'

import { connect } from 'react-redux'
import { Button, Form, Grid, Header,
  Message, Segment, Icon }
   from 'semantic-ui-react'

import { Link } from 'react-router-dom'

import { login } from '../reducers/loginReducer'
import Notification from './Notification'
import store from '../store'


const Login = ({ loggingIn=false, handleChange, handleSubmit }) => (
  <div className='login-form'>
    <div>
    <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}</style>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              {/*<Image src='/logo.png' />*/} Kirjaudu
            </Header>
            <Notification />
            <Form size='large' loading={loggingIn}>
              <Segment stacked>
                <Form.Input
                  name='username'
                  onChange={handleChange}
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='User name' />
                <Form.Input
                  name='password'
                  onChange={handleChange}
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                />

                <Button onClick={handleSubmit} color='teal' fluid size='large'>
                  Kirjaudu
                </Button>
                
              </Segment>
            </Form>
            <Message>
              Uusi täällä? <Link to='/register'>Rekisteröidy</Link>
            </Message>
          </Grid.Column>
        </Grid>
    </div>
  </div>
)

class LoginForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      submitted: false,
      //error: null
    }
  }

  handleLoginFieldChange = (e) => {
    
    this.setState({ [e.target.name]: e.target.value })
  }


  handleClick = (e) => {
    e.preventDefault()

    const { username, password } = this.state
    if(username && password){
      this.props.login({ username, password })
    }
  }

  render() {
    
    return <Login loggingIn={this.props.loggingIn}
                handleChange={this.handleLoginFieldChange}
                handleSubmit={this.handleClick} />
  }
}

const mapStateToProps = (state) => {
  return {
    loggingIn: store.getState().loginReducer.loggingIn
  }
}

export default connect(
  mapStateToProps,
  { login }
)(LoginForm)