import exerciseService from '../services/exercises'
import { exerciseConstants } from '../constants/exercise.constants'
import { errorMsg, successMsg, clearMsg } from './messageReducer'

const timeout = 5000

const reducer = (state = [], action) => {
    switch (action.type) {
        case exerciseConstants.GET_ALL_REQUEST:
            return action.data
        case exerciseConstants.GET_ONE_REQUEST:
            return action.data
        case exerciseConstants.ADD_NEW_REQUEST:
            return [...state, action.data]
        case exerciseConstants.DELETE_REQUEST:
            const index = state.findIndex(e => e.id === action.data)
            if (index === -1) return state

            const newState = state.slice(0, index).concat(state.slice(index+1, state.length))
            return newState
        case 'UPDATE_EXERCISE':
            break            
        default:
            return state
    }
}

const addRequest = (newExercise) => ({ type: exerciseConstants.ADD_NEW_REQUEST, data: newExercise })
const addSuccess = (exercise) => ({ type: exerciseConstants.ADD_NEW_SUCCESS, data: exercise })
const addFailure = (error) => ({ type: exerciseConstants.ADD_NEW_FAILURE, data: error })

const getAllRequest = (exercises) => ({ type: exerciseConstants.GET_ALL_REQUEST, data: exercises })

const deleteRequest = (id) => ({ type: exerciseConstants.DELETE_REQUEST, data: id })


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
        console.log(newExercise)
        
        dispatch(addRequest(newExercise))
        
        //TODO update state after adding new
        //exerciseInitialization()
    }
}



export const exerciseRemoving = (id) => {
    return async (dispatch) => {

        const response = await exerciseService.deleteExercise(id)

        dispatch(deleteRequest(id))
    }
}

export const exerciseUpdating = (content) => {
    
}

export const getOneExercise = (id) => {
    return async (dispatch) => {
        const exercise = await exerciseService.getOne(id)

        console.log('HAETAAN ' + exercise)
        
        dispatch({
            type: 'ONE_EXERCISE',
            data: exercise
        })
    }
}

export const exerciseInitialization = () => {
    return async (dispatch) => {
        const exercises = await exerciseService.getAll()
        //console.log(`EXERCISESIT ${exercises}`)
        
        /* const exercisesArray = Object.values(exercises)
        console.log(exercisesArray)
         */
        dispatch(getAllRequest(exercises))
        /* dispatch({
            type: 'EXERCISES',
            data: exercisesArray
        }) */
    }
}

export default reducer
