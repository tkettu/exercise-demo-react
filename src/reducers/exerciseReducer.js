import exerciseService from '../services/exercises'
import { exerciseConstants } from '../constants/exercise.constants'
import { errorMsg, successMsg, clearMsg } from './messageReducer'

const timeout = 5000

const reducer = (state = [], action) => {
   
    switch (action.type) {
        
        case exerciseConstants.GET_ALL_REQUEST:
        case exerciseConstants.GET_SPORTS_REQUEST:
        case exerciseConstants.GET_ONE_REQUEST:
             return action.data
        case exerciseConstants.ADD_NEW_REQUEST:
            return [...state, action.data]
        case exerciseConstants.DELETE_REQUEST:
            const index = state.findIndex(e => e.id === action.data)
            if (index === -1) return state
            const newState = state.slice(0, index).concat(state.slice(index+1, state.length)) 
            return newState
        case exerciseConstants.UPDATE_REQUEST:
            const updatedExercise = action.data.exercise
            const id = updatedExercise.id
            return state.map(exercise => exercise.id !== id ? exercise : updatedExercise)
        default:
            return state
    }
}

const addRequest = (newExercise) => ({ 
    type: exerciseConstants.ADD_NEW_REQUEST, data: newExercise })
const addSuccess = (exercise) => ({ 
    type: exerciseConstants.ADD_NEW_SUCCESS, data: exercise })
const addFailure = (error) => ({ 
    type: exerciseConstants.ADD_NEW_FAILURE, data: error })

const getOneRequest = (exercise) => ({ 
    type: exerciseConstants.GET_ONE_REQUEST, data: exercise })
const getAllRequest = (exercises) => ({ 
    type: exerciseConstants.GET_ALL_REQUEST, data: exercises })
const getAllBySportRequest = (exercises) => ({
     type: exerciseConstants.GET_SPORTS_REQUEST, data: exercises })

const deleteRequest = (id) => ({ type: exerciseConstants.DELETE_REQUEST, data: id })

const updateRequest = (exercise) => ({ type: exerciseConstants.UPDATE_REQUEST, 
                                            data: { exercise: exercise } })

/* export const exerciseCreation = (content) => {

    return dispatch => {
        dispatch(addRequest(content))
        exerciseService.addNew(content)
        .then(
            exercise => {
                dispatch(addSuccess(exercise))
                console.log('ADDED ' + exercise)
                dispatch(successMsg(`Lisättiin ${exercise}`))
                setTimeout(() => {
                    dispatch(clearMsg())
                  }, timeout)
            },
            error => {
                dispatch(addFailure(error))
                dispatch(errorMsg(JSON.stringify(error.response.data.message)))
                setTimeout(() => {
                  dispatch(clearMsg())
                }, timeout)
            }
        )
    }
} */
export const exerciseCreation = (content) => {
    return async (dispatch) => {
        const newExercise = await exerciseService.addNew(content)
        
        dispatch(addRequest(newExercise))
    }
}

export const exerciseRemoving = (id) => {
    return async (dispatch) => {

        const response = await exerciseService.deleteExercise(id)

        dispatch(deleteRequest(id))
    }
}

export const exerciseUpdating = ( id, content ) => {
   
     return async (dispatch) => {
        const exercise = await exerciseService.updateExercise(id, content)
        dispatch(updateRequest(exercise))
    } 

}


export const exerciseInitialization = () => {
    return async (dispatch) => {
        const exercises = await exerciseService.getAll()
      
        dispatch(getAllRequest(exercises))
      
    }
}

export const getOneExercise = (id) => {
    return async (dispatch) => {
        const exercise = await exerciseService.getOne(id)
        dispatch(getOneRequest(exercise))
    }
}

export const filterBySport = (sport) => {
    return async (dispatch) => {
        const exercises = await exerciseService.getAllBySport(sport)
        dispatch(getAllBySportRequest(exercises))
    }
}
export default reducer
