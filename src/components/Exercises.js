import React from 'react'

import exerciseService  from '../services/exercises'
//Placeholder page




const Tab1 = () => (
  <div>
    TERVE
    
  </div>
)

class Exercises extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      exercises: []
    }

    
  }
  
  componentDidMount = () => {
    this.setState({exercises: exerciseService.getAll()});
    //console.log(this.state(exercises))
    
  }

  render () {
    return (
    <div>
      TT
    </div>
    )
  }
}

export default Exercises