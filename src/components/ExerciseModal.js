import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
//import { ExerciseForm } from './ExerciseForm'
import ExerciseForm  from './ExerciseForm'

const initStyle = {
    modal: {
        top: '0',
        position: 'absolute'
    }
}

const ExerciseModal = () => (
    <Modal trigger={<Button>Lisää harjoitus</Button>} style={initStyle.modal} >
      <Header icon='archive' content='Lisää uusi harjoitus' />
      <Modal.Content>
        <ExerciseForm />
        {/* <Form>
          <Form.Select label='Laji' options={options}/>
          <Form.Input label='Matka' type='number' min={0}  placeholder={0} />
          <Form.Input label='Tunnit' type='number' min={0} placeholder={0} />
          <Form.Input label='Minuutit' type='number' min={0} max={59} placeholder={0} />
          <Form.Input label='Päivä' type='date' />
        </Form> */} 
      </Modal.Content>
      <Modal.Actions>
        <Button>Lisää</Button>
      </Modal.Actions>
    </Modal>
)

export default ExerciseModal