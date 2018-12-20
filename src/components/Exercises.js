import React from 'react'

import { connect } from 'react-redux'
import { exerciseInitialization, getOneExercise, exerciseRemoving } from '../reducers/exerciseReducer'
import store from '../store'
import Moment from 'react-moment'
import _ from 'lodash'
import { Table, Modal, Button, Icon, Header, Form } from 'semantic-ui-react'
import { ExerciseForm } from './ExerciseForm'
import ExerciseModal from './ExerciseModal'
import { exerciseConstants } from '../constants/exercise.constants'


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
            <Table.Cell onClick={deleteExercise(id)}><Icon name='delete' /></Table.Cell>
            
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )


/* const options = [
  {key: 'RUN', text: 'Juoksu', value: 'Juoksu'},
  {key: 'SKI', text: 'Hiihto', value: 'Hiihto'},
  {key: 'WAL', text: 'Kävely', value: 'Kävely'}
]
 */


// const NewExerciseForm = () => {
//   return (
//     //TODO ALIGN TOP
//     <Modal trigger={<Button>Lisää harjoitus</Button>} centered={false} >
//       <Header icon='archive' content='Lisää uusi harjoitus' />
//       <Modal.Content>
//         <ExerciseForm />
//         {/* <Form>
//           <Form.Select label='Laji' options={options}/>
//           <Form.Input label='Matka' type='number' min={0}  placeholder={0} />
//           <Form.Input label='Tunnit' type='number' min={0} placeholder={0} />
//           <Form.Input label='Minuutit' type='number' min={0} max={59} placeholder={0} />
//           <Form.Input label='Päivä' type='date' />
//         </Form> */} 
//       </Modal.Content>
//       <Modal.Actions>
//         <Button>Lisää</Button>
//       </Modal.Actions>
//     </Modal>
    
//   )
// }

class Exercises extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      column: null,
      data: [],
      direction: null
    }


    console.log(this.state.data)
    
  }

   componentWillMount = async () => {
    console.log('WILL MOUNT')
    
    await this.props.exerciseInitialization()
 
    console.log(this.props.exercises)
    
    this.setState({ data: this.props.exercises})
    
    const  { data } = this.state
    //Initial sorting by user VARIABLE
    this.setState({ 
              column: exerciseConstants.INITIAL_SORT_COLUMN, 
              data: _.sortBy(data, [exerciseConstants.INITIAL_SORT_COLUMN]).reverse() 
            })
    

    
  } 

  componentDidMount() {
    console.log('DID MOUNT')
    
  }

  componentDidUpdate() {
    console.log('DID UPDATE')
    
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
    
    console.log(id)
    const exercise = await this.props.getOneExercise(id)
    
    console.log(exercise)
    
    //TODO Tämä Omaansa
    //const deletedEx = await this.props.exerciseRemoving(id)
    
  }

  deleteExercise = (id) => async () => {
    
    const deletedEx = await this.props.exerciseRemoving(id)
    console.log(` DELETED ${deletedEx}`)
    
    this.setState(this.state)
    //this.forceUpdate()
  }

  render() {
    console.log('WILL RENDER')
    console.log(this.state.data)
    
    const { column, data, direction } = this.state
    return (
      <div>
        <ExerciseModal name='Lisää harjoitus'/>
        <ExerciseTable handleSort={this.handleSort}
          column={column} data={data} direction={direction}
          modifyExercise={this.modifyExercise}
          deleteExercise={this.deleteExercise}
        />
        
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
  { exerciseInitialization, getOneExercise, exerciseRemoving }
)(Exercises)