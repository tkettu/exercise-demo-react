import React from 'react'

import { connect } from 'react-redux'
import { exerciseInitialization } from '../reducers/exerciseReducer'
import store from '../store'
import Moment from 'react-moment'
import _ from 'lodash'
import { Table, Modal, Button, Icon, Header, Form } from 'semantic-ui-react'


const ExerciseTable = ({ handleSort, column, data, direction }) => {
  return (

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
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {_.map(data, ({ id, sport, distance, hours, minutes, date }) => (
          <Table.Row key={id}>
            <Table.Cell>{sport}</Table.Cell>
            <Table.Cell>{distance}</Table.Cell>
            <Table.Cell>{hours}:{minutes}</Table.Cell>
            <Table.Cell>
              <Moment format="DD.MM.YY">
                {date}
              </Moment>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

const options = [
  {key: 'RUN', text: 'Juoksu', value: 'Juoksu'},
  {key: 'SKI', text: 'Hiihto', value: 'Hiihto'},
  {key: 'WAL', text: 'Kävely', value: 'Kävely'}
]



const NewExerciseForm = () => {
  return (
    //TODO ALIGN TOP
    <Modal trigger={<Button>Lisää harjoitus</Button>} centered={false} >
      <Header icon='archive' content='Lisää uusi harjoitus' />
      <Modal.Content>
        
        <Form>
          <Form.Select label='Laji' options={options}/>
          <Form.Input label='Matka' type='number' min={0}  placeholder={0} />
          <Form.Input label='Tunnit' type='number' min={0} placeholder={0} />
          <Form.Input label='Minuutit' type='number' min={0} max={59} placeholder={0} />
          <Form.Input label='Päivä' type='date' />
        </Form> 
      </Modal.Content>
      <Modal.Actions>
        <Button>Lisää</Button>
      </Modal.Actions>
    </Modal>
    
  )
}

class Exercises extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      column: null,
      data: props.exercises,
      direction: null
    }

  }

  componentWillMount() {
    this.props.exerciseInitialization()
  }

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state

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

    const { column, data, direction } = this.state

    return (
      <div>

        <NewExerciseForm />
        <ExerciseTable handleSort={this.handleSort}
          column={column} data={data} direction={direction}
        />
        {/* <Table sortable celled fixed>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell
                  sorted={column === 'sport' ? direction : null}
                  onClick={this.handleSort('sport')}
                >
                  Laji
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={column === 'distance' ? direction : null}
                  // onClick={this.handleSort('age')}
                  onClick={this.handleSort('distance')}
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
                  sorted={column === 'date' ? direction : null }
                  onClick={this.handleSort('date')}
                  >
                  Päivä
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
            {_.map(data, ({ id, sport, distance, hours, minutes, date })  => (
              <Table.Row key={id}>
                  <Table.Cell>{sport}</Table.Cell>
                  <Table.Cell>{distance}</Table.Cell>
                  <Table.Cell>{hours}:{minutes}</Table.Cell>
                  <Table.Cell>
                    <Moment format="DD.MM.YY">
                        {date}
                    </Moment>
                  </Table.Cell>
                </Table.Row>
            ))}
            </Table.Body>
      </Table> */}
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