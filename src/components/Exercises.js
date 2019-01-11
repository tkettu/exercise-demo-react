import React from 'react'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  exerciseInitialization, getOneExercise,
  exerciseRemoving, filterBySport
} from '../reducers/exerciseReducer'
import store from '../store'
import Moment from 'react-moment'
import _ from 'lodash'
import { Table, Icon, Segment, Form } from 'semantic-ui-react'
import ExerciseForm from './ExerciseForm'
import Togglable from './Togglable'
import { exerciseConstants } from '../constants/exercise.constants'
import SummaryTable from './SummaryTable'
import { formatHoursMinutes} from '../_helpers/timehandlers'
import { ScatterPlot } from './Graphs'
/**
 * Returns sortable table of exercises
 * @author Tero Kettunen
 * @param {string} column to be sorted
 * @param {*} data to be show at table 
 */
const ExerciseTable = ({ handleSort, column, data, direction,
  modifyExercise, deleteExercise }) => (

    <Table sortable celled fixed>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell
            sorted={column === 'sport' ? direction : null}
            onClick={handleSort('sport')}
          >
            Laji
      </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'distance' ? direction : null}
            onClick={handleSort('distance')}
          >
            Matka
      </Table.HeaderCell>
          <Table.HeaderCell
          //sorted={column === 'gender' ? direction : null}
          //onClick={this.handleSort('gender')}
          >
            Aika
      </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'date' ? direction : null}
            onClick={handleSort('date')}
          >
            Päivä
      </Table.HeaderCell>
          <Table.HeaderCell width={1}></Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {_.map(data, ({ id, sport, distance, hours, minutes, date }) => (
          <Table.Row key={id}>
            <Table.Cell onClick={modifyExercise(id)}>{sport}</Table.Cell>
            <Table.Cell>{distance}</Table.Cell>
            <Table.Cell>{formatHoursMinutes(hours, minutes)}</Table.Cell>
            <Table.Cell>
              <Moment format="DD.MM.YY">
                {date}
              </Moment>
            </Table.Cell>
            <Table.Cell onClick={deleteExercise(id)}><Icon name='delete' /></Table.Cell>

          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )


const options = [
  { key: 'ALL', text: 'Kaikki', value: '' },
  { key: 'RUN', text: 'Juoksu', value: 'Juoksu' },
  { key: 'SKI', text: 'Hiihto', value: 'Hiihto' },
  { key: 'WAL', text: 'Kävely', value: 'Kävely' }
]

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

    const { data } = this.state
    //Initial sorting by user VARIABLE
    this.setState({
      column: exerciseConstants.INITIAL_SORT_COLUMN,
      data: _.sortBy(data, [exerciseConstants.INITIAL_SORT_COLUMN]).reverse(),
      sport: this.props.sport
    })
  }

  componentWillUnmount = () => {
    document.title = 'liikunnat'
  }

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state
    //data = this.props.exercises

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: 'ascending',
      })

      return
    }

    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
  }

  modifyExercise = (id) => async () => {
    const oneExer = this.state.data.find(n => n.id === id)
    // const exercise = await this.props.getOneExercise(id)
    //this.setState({ exercise: this.props.exercises })
    this.setState({ exercise: oneExer })
  }

  updateExerciseTable = () => {
    this.setState({ data: this.props.exercises })
    const { data, column } = this.state

    //Re-sort exercise table after change, by user (or default) sorted column
    this.setState({ data: _.sortBy(data, [column]) })
  }

  updateExercise = () => {
     this.updateExerciseTable()
     this.setState({ exercise: null })
  }

  deleteExercise = (id) => async () => {

    await this.props.exerciseRemoving(id)
    this.updateExerciseTable()
  }

  handleChange = async (sport) => {
    await this.props.filterBySport(sport)
    this.updateExerciseTable()
  }

  handleSportChange = async (e, { value }) => {

    if (value === '') {
      this.props.history.push(`/harjoitukset`)
      await this.props.exerciseInitialization()
    } else {
      this.props.history.push(`/harjoitukset/laji/${value}`)
      await this.props.filterBySport(value)
    }
    this.updateExerciseTable()
  }

  render() {
    const { column, data, direction } = this.state

    if (this.state.sport !== this.props.sport) {

      //FIXME: toimii, mutta ei ole oikein, puhdasta eikä turvallista, koska setstate renderissä
      /*this.setState({sport: this.props.sport})
      this.handleChange(this.props.sport) */
    }

    console.log('DAta on ' + data)
    

    //TODO: provide time as int (for example seconds), change as go to hh:mm
    // Also format from user form to seconds before POST
    const distance = _.map(data, 'distance')
    const time = _.map(data, 'hours')
    
    //TODO: notifications
    return (
      <div>
        <Filter handleSportChange={this.handleSportChange} />
        <ModifyExercise exercise={this.state.exercise} handleSubmit={this.updateExercise}  />
        <Togglable buttonLabel="Lisää harjoitus">
          <ExerciseForm handleSubmit={this.updateExerciseTable} />
        </Togglable>
        <Togglable buttonLabel="Yhteenveto">
          <ScatterPlot x={distance} y={time} />
          <SummaryTable data={data} />
        </Togglable>

        <ExerciseTable handleSort={this.handleSort}
          column={column} data={data} direction={direction}
          modifyExercise={this.modifyExercise}
          deleteExercise={this.deleteExercise}
        />
      </div>
    )

  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(store.getState())
  
  return {
    exercises: store.getState().exerciseReducer,
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