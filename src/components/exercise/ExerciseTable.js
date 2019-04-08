import React from 'react'
import { Table, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import _ from 'lodash'
import { formatHoursMinutes } from '../../_helpers/timehandlers'
import store from '../../store'
import { sortExercises, initTable } from '../../reducers/exerciseReducer'


/**
 * Returns sortable table of exercises
 * @author Tero Kettunen
 * @param {string} column to be sorted
 * @param {*} data to be show at table 
 */
const ExerciseTableSortable = ( {handleSort, column, data, direction,
  modifyExercise, deleteExercise} ) => {
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
            //sorted={column === 'time' ? direction : null}
            //onClick={this.handleSort('time')}
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


export const ExerciseTable = (props) => (
    <ExerciseTableSortable 
      data={props.data}
      handleSort={ (c) => () =>  props.sortExercises(c)}
      modifyExercise={props.modifyExercise}
      deleteExercise={props.deleteExercise}
      column={props.column}
      direction={props.direction} />
)


const mapStateToProps = (state) => {
  return {
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