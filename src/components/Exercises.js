import React from 'react'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { exerciseInitialization, getOneExercise, 
  exerciseRemoving, filterBySport } from '../reducers/exerciseReducer'
import store from '../store'
import Moment from 'react-moment'
import moment from 'moment'
import _ from 'lodash'
import { Table, Icon, Segment, Form } from 'semantic-ui-react'
import ExerciseForm from './ExerciseForm'
import Togglable from './Togglable'
import { exerciseConstants } from '../constants/exercise.constants'
import SummaryTable from './SummaryTable';


const ExerciseTable = ({ handleSort, column, data, direction, modifyExercise, deleteExercise }) => (

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
            // onClick={this.handleSort('age')}
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
      <Table.HeaderCell>viikko</Table.HeaderCell>
      <Table.HeaderCell width={1}></Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {_.map(data, ({ id, sport, distance, hours, minutes, date }) => (
          <Table.Row key={id}>
            <Table.Cell onClick={modifyExercise(id)}>{sport}</Table.Cell>
            <Table.Cell>{distance}</Table.Cell>
            <Table.Cell>{hours}:{minutes}</Table.Cell>
            <Table.Cell>
              <Moment format="DD.MM.YY">
                {date}
              </Moment>
            </Table.Cell>
            <Table.Cell>
              {moment(date).isoWeek()}
            </Table.Cell>
            <Table.Cell onClick={deleteExercise(id)}><Icon name='delete' /></Table.Cell>
            
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )


  const options = [
    { key: 'ALL', text: 'Kaikki', value: ''  },
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

const ModifyExercise = ({exercise}) => {
  console.log(exercise)
  if (exercise === null) return <div></div>
  return (
    <ExerciseForm content={exercise} />
  )
}

class Exercises extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      column: null,
      data: [],
      direction: null,
      sport: '',
      exercise: null
    }

    console.log('CONSTRUCTORIISSA')
    
    console.log(this.props)
    
    
  }

   componentWillMount = async () => {
    //TODO do this at one initialization, with sport param
    // If null/undefined -> All, otherwise sport
    console.log('WILL MOUNT');
    
    if (this.props.sport){
      await this.props.filterBySport(this.props.sport)
    }else {
      await this.props.exerciseInitialization()
    }
    
    this.setState({ data: this.props.exercises})
    
    const  { data } = this.state
    //Initial sorting by user VARIABLE
    this.setState({ 
              column: exerciseConstants.INITIAL_SORT_COLUMN, 
              data: _.sortBy(data, [exerciseConstants.INITIAL_SORT_COLUMN]).reverse(),
              sport: this.props.sport 
            }) 
  } 

  componentWillUpdate = () => {
    console.log('WILL UPDATE')
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

  modifyExercise = ( id ) =>  async () => {
   
    const exercise = await this.props.getOneExercise(id)
    
    console.log(exercise)
    console.log(this.props.exercises)
    this.setState({ exercise: this.props.exercises })
  }

  updateExerciseTable = () => {
    this.setState({ data: this.props.exercises })
    const { data, column } = this.state

    //Re-sort exercise table after change, by user (or default) sorted column
    this.setState({ data: _.sortBy(data, [column]) })
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
    }else {
      this.props.history.push(`/harjoitukset/laji/${value}`)
      await this.props.filterBySport(value)
    } 
    this.updateExerciseTable()
  }

  render() {
    const { column, data, direction } = this.state

    if(this.state.sport!==this.props.sport){
      
      console.log('EI OLLU SAMAT ')
      
      /* console.log('UPDATING')
      //TODO toimii, mutta ei ole oikein, puhdasta eikä turvallista, koska setstate renderissä
      this.setState({sport: this.props.sport})
      this.handleChange(this.props.sport) */
    }
    console.log(this.state.sport)
    
    
    
    return (
      <div>
        <Filter handleSportChange={this.handleSportChange}/>
        <ModifyExercise exercise={this.state.exercise}/>
        <Togglable buttonLabel="Lisää harjoitus">
          <ExerciseForm handleSubmit={this.updateExerciseTable}/>
        </Togglable>
        <Togglable buttonLabel="Yhteenveto">
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
  return {
    exercises: store.getState().exerciseReducer,
    sport: ownProps.sport
  }
}

export default withRouter(connect(
  mapStateToProps,
  { exerciseInitialization, getOneExercise, 
    exerciseRemoving, filterBySport }
)(Exercises))