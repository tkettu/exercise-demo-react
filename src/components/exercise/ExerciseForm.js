import React from 'react'

import { connect } from 'react-redux'
import { Button, Form, Segment } from 'semantic-ui-react'
import { exerciseCreation, exerciseUpdating } from '../../reducers/exerciseReducer'
import { exerciseConstants } from '../../constants/exercise.constants'
import Togglable from '../Togglable'
import Notification from '../Notification'
import store from '../../store'
import moment from 'moment'


//TODO: Get options from API, by user
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

const MainForm = ({ handleSportChange, handleChange, sport='', distance='', hours='', minutes='' }) => (
    <Form.Group>
        <Form.Select label='Laji' name='sport'  options={options}
            onChange={handleSportChange} defaultValue={sport} />
        <Form.Input label='Matka' name='distance' type='number' 
            min={0} max={9999} placeholder={0} onChange={handleChange}
            defaultValue={distance}
        />
        <Form.Input label='Tunnit' name='hours' type='number'
            min={0} max={9999} placeholder={0} onChange={handleChange}
            defaultValue={hours} />
        <Form.Input label='Minuutit' name='minutes' type='number'
            min={0} max={59} placeholder={0} onChange={handleChange}
            defaultValue={minutes} />
    </Form.Group>
)


const DateForm = ({ handleChange, date=moment().format(exerciseConstants.DATE_FORMAT),
                     avgHeartRate='', maxHeartRate='' }) => (
    <Form.Group>
        <Form.Input label='Päivä' name='date' type='date' onChange={handleChange} defaultValue={date}/>
        <Form.Input label='Syke ka' name='avgheartrate' type='number' min={0} 
                max={500} onChange={handleChange} defaultValue={avgHeartRate}/>
        <Form.Input label='max syke' name='maxheartrate' type='number' min={0}
                 max={500} onChange={handleChange}  defaultValue={maxHeartRate}/>
        <Form.Select label='Kausi' name='season' options={seasonOptions} type='text' /> 
    </Form.Group>
)

const DescriptionForm = ({ handleChange, description='' }) => (
    <Form.TextArea label='Kuvaus' name='description' type='text' 
                    onChange={handleChange} defaultValue={description}/>
)

const OldExerciseForm = ({ updating=false, handleSubmit, handleChange, handleSportChange, content, handleContent }) => {

    const { sport, distance, hours, minutes, date, description, avgHeartRate, maxHeartRate } = content
    
    return (

        <Segment>
            
            <Form loading={updating}>
                <MainForm handleSportChange={handleSportChange} handleChange={handleChange} 
                        sport={sport} distance={distance} hours={hours} minutes={minutes}/>
                <DateForm handleChange={handleChange} 
                        date={date} avgHeartRate={avgHeartRate} maxHeartRate={maxHeartRate}/>
                <Togglable icon='angle right' >
                    <DescriptionForm handleChange={handleChange} description={description} />
                </Togglable>
                <Button onClick={handleSubmit} color='green' size='large'>
                    Päivitä
                </Button>
            </Form>
        </Segment>
    )
}

const NewExerciseForm = ({ adding=false, handleSubmit, handleChange, handleSportChange }) => (
    <Segment>
        <Form loading={adding}>
            <MainForm handleSportChange={handleSportChange} handleChange={handleChange} />
            <DateForm handleChange={handleChange} />
            <Togglable  icon='angle right' >
                <DescriptionForm handleChange={handleChange} />
            </Togglable>
            <Button onClick={handleSubmit} color='teal' size='medium'>
                Lisää uusi
            </Button>
        </Form>
        <Notification />
    </Segment>
)

/**
 * Creates form for new exercise or form for updating old 
 * @author Tero Kettunen
 */

class ExerciseForm extends React.Component {
    constructor(props) {
        super(props)
      
        this.state = {
            sport: 'Juoksu',
            distance: 0,
            hours: 0,
            minutes: 0,
            date: '',
            avgheartrate: 0,
            maxheartrate: 0,
            description: '',
            adding: false
        }
    }

    componentWillMount = () => {
        // Put old exercise to state if it exists 
        const content = this.props.content
        if (content !== null && content !== undefined){
            this.setState(content)
        }
    }

    handleSelectChange = (e, { value }) => {
        this.setState({ sport: value })
    }

    handleFieldChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleClick = async (e) => {
        e.preventDefault()
        const content = this.state
        await this.props.exerciseCreation(content)
        //this.props.handleSubmit()     
    }


    handleUpdate = async (e) => {
        e.preventDefault()
        const id = this.props.content.id
        const content = this.state
        await this.props.exerciseUpdating(id, content)
        this.props.handleSubmit()
    }

    render() {
       console.log(store.getState().exerciseReducer)
  
        //TODO: Notification kun lisätty harjoitus, sulje tai mahdollista uuden lisääminen
        if (this.props.content !== null && this.props.content !==undefined) {
           
            return <OldExerciseForm 
                updating={this.props.updating}
                handleChange={this.handleFieldChange}
                handleSubmit={this.handleUpdate}
                handleSportChange={this.handleSelectChange}
                content={this.props.content}
            />
        }
    
        return <NewExerciseForm 
            adding={this.props.adding}
            handleChange={this.handleFieldChange}
            handleSubmit={this.handleClick}
            handleSportChange={this.handleSelectChange} />
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        adding: store.getState().exerciseReducer.adding,
        updating: store.getState().exerciseReducer.updating,
        content: ownProps.content
    }
}

export default connect(
    mapStateToProps,
    { exerciseCreation, exerciseUpdating }
)(ExerciseForm)