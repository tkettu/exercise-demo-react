import React from 'react'

import { connect } from 'react-redux'
import { Button, Form, Grid, Header, Segment, Accordion, Menu } from 'semantic-ui-react'
import { exerciseCreation } from '../reducers/exerciseReducer'

//TODO Get options from API, by user
const options = [
    { key: 'RUN', text: 'Juoksu', value: 'Juoksu' },
    { key: 'SKI', text: 'Hiihto', value: 'Hiihto' },
    { key: 'WAL', text: 'Kävely', value: 'Kävely' }
]

const panels = [
    {
      key: 'details',
      title: 'Optional Details',
      content: {
        as: Form.Input,
        label: 'Maiden Name',
        placeholder: 'Maiden Name',
      },
    },
  ]

const ExtraForm = (
    <div>
        <Form.Group>
            <Form.Input label='Syke ka' name='avgheartrate' type='number' min={0}/>
            <Form.Input label='max syke' name='maxheartrate' type='number' min={0}/>
        </Form.Group>
        <Form.Input label='Kuvaus' name='description' type='text' />
    </div>     
    
)

const NewExerciseForm = ({ handleSubmit, handleChange, handleSportChange }) =>  (
    <Segment>

        <Form>
            <Form.Select label='Laji' name='sport' options={options} onChange={handleSportChange} />
            <Form.Input label='Matka' name='distance' type='number'
                 min={0} max={9999} placeholder={0} onChange={handleChange}
                 />
            <Form.Group widths={2}>
            <Form.Input label='Tunnit' name='hours' type='number' 
                min={0} max={9999} placeholder={0} onChange={handleChange}/>
            <Form.Input label='Minuutit' name='minutes' type='number' 
                min={0} max={59} placeholder={0} onChange={handleChange}/>
            </Form.Group>
            <Form.Input label='Päivä' name='date' type='date' onChange={handleChange}/>
            <Accordion as={Form.Group} >
                <Accordion.Content active={false} content={ExtraForm} />
            </Accordion>
            <Button onClick={handleSubmit} color='teal' fluid size='large'>
                Lisää
            </Button>
        </Form>
    </Segment>
    )

class ExerciseForm extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)
        
        this.state = {
            sport: 'Juoksu',
            distance: 0,
            hours: 0,
            minutes: 0,
            date: '',
            avgheartrate: 0,
            maxheartrate: 0,
            description: '',


        }
    }

    handleSelectChange = (e, { value }) => {
        this.setState({ sport : value })
        console.log(this.state.sport + ' ' + value)
        
    }

    handleFieldChange = (e) => {
        this.setState({ [e.target.name]: e.target.value }) 
        console.log(e.target.name + ' ' + e.target.value)
               
    }

    handleClick = (e) => {
        e.preventDefault()

        const { sport, distance, hours, minutes, date } = this.state
        console.log('LISATAAN ' + sport + ' ' + distance)  
        const content = this.state
        
        this.props.exerciseCreation(content)
        this.props.handleSubmit()
    }

    render() {

        if (this.props.content !== null){
            console.log(this.props.content)
            
        }

        return <NewExerciseForm handleChange={this.handleFieldChange}
                            handleSubmit={this.handleClick}
                            handleSportChange={this.handleSelectChange}/> 
    }
} 

export default connect(
    null,
    { exerciseCreation }
)(ExerciseForm)