import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
//import { ExerciseForm } from './ExerciseForm'
import ExerciseForm  from './ExerciseForm'

const initStyle = {
    modal: {
        top: '0',
        position: 'absolute',
        
    }
    
}

const FormModal = ({ handleOpen, handleClose, modalOpen, content, name }) => (
  <Modal  trigger={<Button onClick={handleOpen}>{name}</Button>}  
        style={initStyle.modal}
        open={modalOpen}
        onClose={handleClose}
        >
      <Header icon='archive' content='Lisää uusi harjoitus' />
      <Modal.Content>
        <ExerciseForm handleSubmit={handleClose} content={content}/>
         
      </Modal.Content>
      
    </Modal>
)

class ExerciseModal extends React.Component {
  constructor(props){
    super(props)

    console.log(props)
    console.log('TASSA OLLAAN')
    this.state = { modalOpen : false }
  }

  handleOpen = () => this.setState({ modalOpen: true })
  handleClose = () => this.setState({ modalOpen: false })
  
  render() {
    return (
      <FormModal 
        handleOpen={this.handleOpen} 
        handleClose={this.handleClose}
        modalOpen={this.state.modalOpen}
        content={this.props.content}
        name={this.props.name} />
    )
  }
}



export default ExerciseModal