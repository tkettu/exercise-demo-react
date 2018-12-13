import React from 'react'

import { connect } from 'react-redux'
import { Button, Form, Grid, Header,
  Message, Segment }
   from 'semantic-ui-react'

import { register } from '../reducers/userReducer'
import Notification from './Notification'

class RegisterForm extends React.Component {
  constructor(props) {
    super(props)

    //this.props.dispatch(logout)
    //this.props.logout()

    this.state = {
      username: '',
      password: '',
      password2: '',
      submitted: false
    }
  }

  handleLoginFieldChange = (e) => {
    
    this.setState({ [e.target.name]: e.target.value })
  }

  handleClick = (e) => {
    e.preventDefault()
    
    const { username, password, password2 } = this.state

    if(username && password===password2){
      const user = {
        username,
        password
      }
      this.props.register(user)
    }
   /*  const { username, password } = this.state
    if(username && password){
      this.props.login({ username, password })
      this.setState({ submitted: true })
      this.props.history.push('/')
    }//else username or password wrongeja */
  }

  render() {
    const { submitted } = this.state
    /* if (submitted) {
      return <Redirect to='/' />
    }
 */
    return (
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
                  {/*<Image src='/logo.png' />*/} Register
                </Header>
                <Notification />
                <Form size='large'>
                  <Segment stacked>
                    <Form.Input 
                      name='username'
                      onChange={this.handleLoginFieldChange}
                      fluid 
                      icon='user'
                      iconPosition='left'
                      placeholder='Username' />
                    <Form.Input
                      name='password'
                      onChange={this.handleLoginFieldChange}
                      fluid
                      icon='lock'
                      iconPosition='left'
                      placeholder='Password'
                      type='password'
                    />
                    <Form.Input
                      name='password2'
                      onChange={this.handleLoginFieldChange}
                      fluid
                      icon='lock'
                      iconPosition='left'
                      placeholder='Password'
                      type='password'
                    />
    
                    <Button onClick={this.handleClick} color='teal' fluid size='large'>
                      Sign up
                    </Button>
                  </Segment>
                </Form>
              </Grid.Column>
           </Grid>
          </div>
        </div>
    )
  }
}

export default connect(
  null,
  { register }
)(RegisterForm)