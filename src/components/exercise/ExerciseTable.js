import React from 'react'
import { Table, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import _ from 'lodash'
import { formatHoursMinutes } from '../../_helpers/timehandlers'
import store from '../../store';
import { tableConstants } from '../../constants/table.constants';
import { sortExercises, initTable } from '../../reducers/exerciseReducer'

/* const handleSort = (clickedColumn) => () => {
  sortTable(clickedColumn)
}
 */
/**
 * Returns sortable table of exercises
 * @author Tero Kettunen
 * @param {string} column to be sorted
 * @param {*} data to be show at table 
 */
const ExerciseTableSortable = ( {handleSort, column, data, direction,
  modifyExercise, deleteExercise} ) => {
    console.log(data)
    
    return(
    <Table sortable celled fixed collapsing>
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
  }

/* const ExerciseTable = (props) => {
  //props.initializeTable(props.data)
  return (
    <ExerciseTableSortable data={props.data} 
      modifyExercise={props.modifyExercise}
      deleteExercise={props.deleteExercise}
      column={props.column}
      direction={props.direction}
       />
  ) 

}
 */
/* class ExerciseTable extends React.Component {
  constructor(props) {
    super(props)
    console.log(props)
    
    this.state = {
      column: null,
      data:[],
      direction: null 
    }
  }

  componentWillMount = () => {
    this.setState({ data: this.props.data })
    console.log(this.props)
    
  }

  componentDidMount = () => {
    console.log('DID MOUNT')
    console.log(this.props)
    
  }

  componentDidUpdate = () => {
    console.log('DID UPDATE')
  }

  componentWillReceiveProps = () => {
    console.log('WILL RECEIVE PROPS')
    console.log(this.props)
    
    this.setState({ data: this.props.data })
    console.log(this.state.data)
    
    const { data } = this.state
    //Initial sorting by user VARIABLE
    this.setState({
      column: tableConstants.INITIAL_SORT_COLUMN,
      data: _.sortBy(data, [tableConstants.INITIAL_SORT_COLUMN]).reverse()
    })
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

  render() {
    console.log(this.props)
    
    const { column, data, direction } = this.state
    console.log(data)
    
    return (
      <ExerciseTableSortable data={data} 
        handleSort={this.handleSort}
        modifyExercise={this.props.modifyExercise}
        deleteExercise={this.props.deleteExercise}
        column={column}
        direction={direction}
       />
    )
  }
} */

let column = null
let direction = null


/* const handleSort = (c) => () => {
 
  console.log(c)
} */

const ExerciseTable = (props) => {
  console.log(props)

  return(
  <ExerciseTableSortable 
    data={props.data}
    handleSort={ (c) => () =>  props.sortExercises(c)}
    modifyExercise={props.modifyExercise}
    deleteExercise={props.deleteExercise}
    column={column}
    direction={direction} />
  )
}

const mapStateToProps = (state) => {
  //console.log(store.getState().tableReducer)
  
  return {
    //data: store.getState().tableReducer.data,
    data: store.getState().exerciseReducer.exercises,
    column: store.getState().exerciseReducer.column,
    direction: store.getState().exerciseReducer.direction
  }
}

//export default ExerciseTable

 export default connect(
  mapStateToProps,
  { sortExercises, initTable }
)(ExerciseTable) 