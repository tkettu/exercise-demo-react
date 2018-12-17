import React from 'react'

import { connect } from 'react-redux'
import { exerciseInitialization } from '../reducers/exerciseReducer'
import store from '../store'

const ExericseList = (exercises) => {

  const exerciseList = exercises.map((exercise) =>
    <li key={exercise.id}>{exercise.sport}</li>
  )
  //ToDo Semantic table, react table, pagination ja sorting -> Front vai back
  //ToDo If not signed in
  return exerciseList
}

class Exercises extends React.Component {
  /* constructor(props) {
    super(props)
    this.state = {
      exercises: []
    }

   
  }*/

  componentWillMount() {
    this.props.exerciseInitialization()
  }

  render() {
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
)(Exercises)