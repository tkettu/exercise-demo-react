import React from 'react'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  exerciseInitialization, getOneExercise,
  exerciseRemoving, filterBySport
} from '../reducers/exerciseReducer'
import store from '../store'
import _ from 'lodash'
import { Segment, Form, Tab, Button, Grid } from 'semantic-ui-react'
import ExerciseForm from './exercise/ExerciseForm'
import Togglable from './Togglable'
import SummaryTable from './exercise/SummaryTable'
import ExerciseTable from './exercise/ExerciseTable'
import { ScatterPlot } from './exercise/Graphs'
import PlotView from './exercise/Graphs'
import { options } from '../constants/sports'


/*const options = [
  { key: 'ALL', text: 'Kaikki', value: '' },
  { key: 'RUN', text: 'Juoksu', value: 'Juoksu' },
  { key: 'SKI', text: 'Hiihto', value: 'Hiihto' },
  { key: 'WAL', text: 'Kävely', value: 'Kävely' }
]*/

const Filter = ({ handleSportChange }) => (
  <Segment>
    <Form>
      <Form.Select label='Laji' name='sport' options={options}
        onChange={handleSportChange} />
    </Form>
  </Segment>
)

const ModifyExercise = ({ exercise, handleSubmit }) => {
  
  if (exercise === null) return <div></div>
  return (
        <ExerciseForm content={exercise} handleSubmit={handleSubmit}/>
  )
}

class Exercises extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      column: null,
      data: [],
      direction: null,
      sport: '',
      exercise: null
    }
  }

  componentWillMount = async () => {
    
    let title = 'harjoitukset'
    // If null/undefined -> All, otherwise sport
    if (this.props.sport) {
      await this.props.filterBySport(this.props.sport)
      title = this.props.sport
    } else {
      await this.props.exerciseInitialization()
    }
    document.title = title
    this.setState({ data: this.props.exercises })
  }

  componentWillUnmount = () => {
    document.title = 'liikunnat'
  }

  modifyExercise = (id) => async () => {
    const oneExer = this.props.exercises.find(n => n.id === id)
    this.setState({ exercise: oneExer })
  }

  handleExerciseUpdate = () => {
    this.setState({ exercise: null })
  }

  deleteExercise = (id) => async () => {
    await this.props.exerciseRemoving(id)
  }

  handleChange = async (sport) => {
    await this.props.filterBySport(sport)
    //this.updateExerciseTable()
  }

  handleSportChange = async (e, { value }) => {

    if (value === '') {
      this.props.history.push(`/harjoitukset`)
      await this.props.exerciseInitialization()
    } else {
      this.props.history.push(`/harjoitukset/laji/${value}`)
      await this.props.filterBySport(value)
    }
    //this.updateExerciseTable()
  }

  render() {
    const { column, data, direction } = this.state
   
    if (this.state.sport !== this.props.sport) {

      //FIXME: toimii, mutta ei ole oikein, puhdasta eikä turvallista, koska setstate renderissä
      /*this.setState({sport: this.props.sport})
      this.handleChange(this.props.sport) */
    }
    //TODO: Move table handlers (sort, updating) to own component, so that for example sorting doesn't render all other components
   
    //TODO: provide time as int (for example seconds), change as go to hh:mm
    // Also format from user form to seconds before POST
  
    //TODO: Format date and add sport to definition of graph also
    
    const panes = [
      { menuItem: 'Harjoitukset', pane: 
        <Tab.Pane key="exercises">
          <Grid columns={2}>
           
           <Grid.Row>
              <Grid.Column>
                <ExerciseTable
                data={data}
                modifyExercise={this.modifyExercise}
                deleteExercise={this.deleteExercise}
                />
              </Grid.Column>
              <Grid.Column only='computer'>
                <ScatterPlot data={data}/>
              </Grid.Column>
            </Grid.Row>
        
        </Grid>
        </Tab.Pane>},
      { menuItem: 'Yhteenveto', pane:
        <Tab.Pane key="summary"><SummaryTable data={data} /> </Tab.Pane> },
      { menuItem: 'Kuvaaja', pane: 
        <Tab.Pane key="plots"><PlotView /></Tab.Pane> },
    ]  
    

    //TODO: notifications
    return (
      <div>
        <Filter handleSportChange={this.handleSportChange} />
        <ModifyExercise exercise={this.state.exercise} 
                        handleSubmit={this.handleExerciseUpdate} />
        <Togglable buttonLabel="Lisää harjoitus">
          <ExerciseForm  />
        </Togglable>
        <Tab
         
          panes={panes} renderActiveOnly={false}
           />        
      </div>
    )

  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    exercises: store.getState().exerciseReducer.exercises,
    exercise: store.getState().exerciseReducer.exercise,
    sport: ownProps.sport
  }
}

export default withRouter(connect(
  mapStateToProps,
  {
    exerciseInitialization, getOneExercise,
    exerciseRemoving, filterBySport
  }
)(Exercises))