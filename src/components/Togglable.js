import React from 'react'
import { Button } from 'semantic-ui-react'

class Togglable extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        visible: false
      }
    }
  
    toggleVisibility = () => {
      this.setState({visible: !this.state.visible})
    }
  
    render() {
      const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
      const showWhenVisible = { display: this.state.visible ? '' : 'none' }

      
  
      //const toggleVisibility = {display: !this.state.visible}

      return (
        <div>
          <div >
            <Button onClick={this.toggleVisibility} fluid size='large'>
                    { this.state.visible ? 'Peruuta' : this.props.buttonLabel }
            </Button>
          </div>
          <div style={showWhenVisible}>
            {this.props.children}
          </div>
        </div>
      )
    }
}

  export default Togglable


/*
  <div>
          <div style={hideWhenVisible}>
            <Button onClick={this.toggleVisibility} fluid size='large'>{this.props.buttonLabel}</Button>
          </div>
      <div style={showWhenVisible}>
        {this.props.children}
        <Button onClick={this.toggleVisibility} color='red'>cancel</Button>
      </div>
        </div>
        */