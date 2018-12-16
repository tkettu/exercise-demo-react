import React from 'react'

import exerciseService  from '../services/exercises'
//Placeholder page






//const ExericseList = (exercises) => {
  const ExericseList = (props) => {
  console.log(`EXERCISESIOT on ${exercises}`  )
  
  //const exerciseList = exercises.map((exercise) => 
  //<li>exercise</li>
  //)
  return(
    <div>
      TÄNNE EXERCISELIST
      EHKÄPÄ redux storesta se otetaan, kun se sinne loginissa laitettu on
      
    </div>
    //return exerciseList
  )
}

class Exercises extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      exercises: []
    }

    
  }
  
  componentDidMount = async () => {
    await this.setState({exercises: exerciseService.getAll()});
    console.log(this.state.exercises)
    
  }

  render () {
    return (
    <div>
      {ExericseList(this.state.exercises)}
    </div>
    )
  }
}

export default Exercises