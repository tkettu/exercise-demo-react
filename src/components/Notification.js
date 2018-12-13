import React from 'react'
import store from '../store'
import { connect } from 'react-redux'

import { Message } from 'semantic-ui-react'

class Notification extends React.Component {
  
  render() {
    const { message } = this.props
    
    return ( message === null ? null :
      (
        <Message className={message.type}>
            {message.message}
        </Message>
      )
    )
  }
}

const mapStateToProps = (state) => {
  return {
    message: store.getState().messageReducer 
  }
}

export default connect(
  mapStateToProps
 )(Notification)