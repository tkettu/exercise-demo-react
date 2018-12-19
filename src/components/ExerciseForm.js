import React from 'react'

import { connect } from 'react-redux'
import { Button, Form, Grid, Header } from 'semantic-ui-react'
import { exerciseCreation } from '../reducers/exerciseReducer'

//TODO Get options from API, by user
const options = [
    { key: 'RUN', text: 'Juoksu', value: 'Juoksu' },
    { key: 'SKI', text: 'Hiihto', value: 'Hiihto' },
    { key: 'WAL', text: 'Kävely', value: 'Kävely' }
]

const NewExerciseForm = ({ handleSubmit, handleChange, handleSportChange }) =>  (
        <Form>
            <Form.Select label='Laji' name='sport' options={options} onChange={handleSportChange} />
            <Form.Input label='Matka' name='distance' type='number'
                 min={0} max={9999} placeholder={0} onChange={handleChange}
                 />
            <Form.Input label='Tunnit' name='hours' type='number' min={0} max={9999} placeholder={0} onChange={handleChange}/>
            <Form.Input label='Minuutit' name='minutes' type='number' min={0} max={59} placeholder={0} onChange={handleChange}/>
            <Form.Input label='Päivä' name='date' type='date' onChange={handleChange}/>

            <Button onClick={handleSubmit} color='teal' fluid size='large'>
                Lisää
            </Button>
        </Form>
    )

class ExerciseForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            sport: '',
            distance: 0,
            hours: 0,
            minutes: 0,
            date: ''
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
    }

    render() {
        return <NewExerciseForm handleChange={this.handleFieldChange}
                            handleSubmit={this.handleClick}
                            handleSportChange={this.handleSelectChange}/> 
    }
} 

export default connect(
    null,
    { exerciseCreation }
)(ExerciseForm)