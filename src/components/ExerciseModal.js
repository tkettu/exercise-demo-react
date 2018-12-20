import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
//import { ExerciseForm } from './ExerciseForm'
import ExerciseForm  from './ExerciseForm'

const initStyle = {
    modal: {
        top: '0',
        position: 'absolute',
        marginbottom: '1px',
    }
}

class ExerciseModal extends React.Component {
  constructor(props){
    super(props)
    this.state = { modalOpen : false }
  }

  handleOpen = () => this.setState({ modalOpen: true })
  handleClose = () => this.setState({ modalOpen: false })
  
  render() {
    return (
      <Modal trigger={<Button onClick={this.handleOpen}>Lisää harjoitus</Button>}  
        style={initStyle.modal}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        >
      <Header icon='archive' content='Lisää uusi harjoitus' />
      <Modal.Content>
        <ExerciseForm handleSubmit={this.handleClose}/>
         
      </Modal.Content>
      
    </Modal>
    )
  }
}



export default ExerciseModal