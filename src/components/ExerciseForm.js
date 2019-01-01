import React from 'react'

import { connect } from 'react-redux'
import { Button, Form, Grid, Header, Segment, Accordion, Menu } from 'semantic-ui-react'
import { exerciseCreation } from '../reducers/exerciseReducer'
import Togglable from './Togglable'


//TODO Get options from API, by user
const options = [
    { key: 'RUN', text: 'Juoksu', value: 'Juoksu' },
    { key: 'SKI', text: 'Hiihto', value: 'Hiihto' },
    { key: 'WAL', text: 'Kävely', value: 'Kävely' }
]

const seasonOptions = [
    { key: 'S18', text: 'Hiihto 18-19', value: 'Hiihto1819' },
    { key: 'R18', text: 'Juoksu 2018', value: 'Juoksu2018' },
    { key: 'R19', text: 'Juoksu 2019', value: 'Juoksu2019' }
]

const MainForm = ({ handleSportChange, handleChange }) => (
    <Form.Group>
        <Form.Select label='Laji' name='sport'  options={options}
            onChange={handleSportChange} />
        <Form.Input label='Matka' name='distance' type='number' 
            min={0} max={9999} placeholder={0} onChange={handleChange}
        />
        <Form.Input label='Tunnit' name='hours' type='number'
            min={0} max={9999} placeholder={0} onChange={handleChange} />
        <Form.Input label='Minuutit' name='minutes' type='number'
            min={0} max={59} placeholder={0} onChange={handleChange} />
    </Form.Group>
)

const DateForm = ({ handleChange }) => (
    <Form.Group>
        <Form.Input label='Päivä' name='date' type='date' onChange={handleChange} />
        <Form.Input label='Syke ka' name='avgheartrate' type='number' min={0} onChange={handleChange}/>
        <Form.Input label='max syke' name='maxheartrate' type='number' min={0} onChange={handleChange}/>
        <Form.Select label='Kausi' name='season' options={seasonOptions} type='text' /> 
    </Form.Group>
)

const DescriptionForm = ({ handleChange }) => (
    <Form.TextArea label='Kuvaus' name='description' type='text' />
)

const NewExerciseForm = ({ handleSubmit, handleChange, handleSportChange }) => (
    <Segment>

        <Form>
            <MainForm handleSportChange={handleSportChange} handleChange={handleChange} />
            <DateForm handleChange={handleChange} />
            <Togglable buttonLabel="Kuvaus" >
                <DescriptionForm handleChange={handleChange} />
            </Togglable>
            <Button onClick={handleSubmit} color='teal' fluid size='large'>
                Lisää uusi
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
        this.setState({ sport: value })
        console.log(this.state.sport + ' ' + value)

    }

    handleFieldChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
        console.log(e.target.name + ' ' + e.target.value)

    }

    handleClick = async (e) => {
        e.preventDefault()

        const { sport, distance, hours, minutes, date } = this.state
        console.log('LISATAAN ' + sport + ' ' + distance)
        const content = this.state

        await this.props.exerciseCreation(content)
        this.props.handleSubmit()
    }

    render() {
        //TODO Notification kun lisätty harjoitus, sulje tai mahdollista uuden lisääminen
        if (this.props.content !== null) {
            console.log(this.props.content)

        }

        return <NewExerciseForm handleChange={this.handleFieldChange}
            handleSubmit={this.handleClick}
            handleSportChange={this.handleSelectChange} />
    }
}

export default connect(
    null,
    { exerciseCreation }
)(ExerciseForm)