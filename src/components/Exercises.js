import React from 'react'

import { connect }  from 'react-redux'
import { exerciseInitialization } from '../reducers/exerciseReducer'
import store from '../store'
//Placeholder page






//const ExericseList = (exercises) => {
  const ExericseList = (exercises) => {
  console.log(`EXERCISESIOT on ${JSON.stringify(exercises)}`  )
  console.log(store.getState())

  const exercisesArray = Object.values(exercises)
  console.log(typeof(exercisesArray))
  
  
  const exerciseList = exercisesArray.map((exercise) => 
    <li>{exercise}</li>
  ) 

  console.log(exerciseList)

  //return exerciseList 
  //return JSON.stringify(exercises)

  //const exerciseList = exercises.map((exercise) => 
  //<li>exercise</li>
  //)
  return <div>R</div>
  /*return(
    <div>
      TÄNNE EXERCISELIST
      EHKÄPÄ redux storesta se otetaan, kun se sinne loginissa laitettu on
      
    </div>
    
  )*/
}

class Exercises extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      exercises: []
    }

    
  }
  
  /* componentWillMount = async () =>  {
    await this.props.exerciseInitialization()
    console.log(this.props.exercises)
    
    
  } */
  

  render () {
    return (
    <div>
      {ExericseList(this.props.exercises)}
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    exercises: store.getState().exerciseReducer
  }
}

export default connect(
  mapStateToProps,
  { exerciseInitialization }
) (Exercises)