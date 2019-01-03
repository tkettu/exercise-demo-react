import React from 'react'

import { connect } from 'react-redux'
import { exerciseInitialization, getOneExercise, exerciseRemoving } from '../reducers/exerciseReducer'
import store from '../store'
import Moment from 'react-moment'
import moment from 'moment'
import _ from 'lodash'
import { Table, Modal, Button, Icon, Header, Form } from 'semantic-ui-react'
import ExerciseForm from './ExerciseForm'
import ExerciseModal from './ExerciseModal'
import Togglable from './Togglable'
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

const Filter = () => {
  return (
    <div>TANNE FILTERI</div>
  )
}


const Summary =({ data }) => {
  
  //TODO lodash tai reduce laske summa
  
  const tulokset = _(data).groupBy('sport')
                    .map((values, key) => ({
                       'sport': key,
                       'distance': _.sumBy(values, 'distance')
                    })).value()

  _.map(data, ({ date }) => (
    console.log(moment(date).isoWeek())
    
  ))

  const weeks = _.map(data, ({ date, distance, sport }) => ({
    'sport': sport,
    'distance': distance,
    'weekAndYear': moment(date).isoWeek() + '/' +  moment(date).year()
  }))

  console.log((weeks))
  
  const weekResults = _.groupBy(weeks, (item) => {
    return item.sport
  })


  const sportRes = _.forEach(weekResults, (value, key) => {
    weekResults[key] = _.groupBy(weekResults[key], (item) => {
      return item.weekAndYear
    })
  })


  const sportRes2 =
  _.forEach(weekResults, (value, key) => {
    _(weekResults).groupBy('weekAndYear')
      .map((values, key) => ({
      'sport': key,
      'total': _.sumBy(values, 'distance')
    }))
  })

    //SUMMAA yli sportRes Viikkojen
  /*const sportRes = _.forEach(weeks, (value, key) => {
    weeks[key] = _.groupBy(weeks[key], (item) =>  {
      return item.weekAndYear
    })
                        
  })*/

  console.log(weekResults)
  console.log(sportRes)
  console.log(sportRes2)
  
  


                 /*.map((values, key) => ({
                   'week': key,
                   'total': _.sumBy(values, 'distance')
                 })*/
  
  
  

  //TODO lisää viikon ja kuukaudennumerot jossain (backarissä vai täällä)  
  /*const weekResults = _(data).groupBy('date')
                      .map((values, key) => ({
                        'week': key,
                        'total': _.sumBy(values, 'distance')
                      })).value()
*/
 
  
  //_.filter(data,)
  //const weekResults = _(data).groupBy({weekNumber})
  //TODO Viikko ja kuukausitulokset yhteensä ja lajeittain
  // Backendista vai täältä?, filterit lajeittain?

  return(
    <div>
      {_.map(tulokset, ({sport, distance}) => (
         <span key={sport} > {sport} on menty {distance} km </span> 
      ))}

     
    </div>
  )
}

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

  

  componentWillReceiveProps() {
    console.log('WILL RECEIVE PROPS')
    
    //this.setState({ data: this.props.exercises })
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

  updateExerciseTable = () => {
    this.setState({ data: this.props.exercises })
    const { data, column } = this.state

    //Put new exercise in its own place, by user (or default) sorted column
    this.setState({ data: _.sortBy(data, [column]) })
  }

  deleteExercise = (id) => async () => {
    
    const deletedEx =  await this.props.exerciseRemoving(id)
    this.updateExerciseTable()
  }

  render() {
    console.log('WILL RENDER')
    console.log(this.state.data)
    console.log(this.props.exercises)
    //
    const { column, data, direction } = this.state
    return (
      <div>
        <Togglable buttonLabel="Lisää harjoitus">
          <ExerciseForm handleSubmit={this.updateExerciseTable}/>
        </Togglable>
        <Togglable buttonLabel="Filteröi">
          <Filter />
        </Togglable>
        
        <Summary data={data} />
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