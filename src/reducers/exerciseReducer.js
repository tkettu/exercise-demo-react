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
            console.log([...state, action.data])
            
            return [...state, action.data]
        
        case 'DELETE_EXERCISE':
            break
        case 'UPDATE_EXERCISE':
            break            
        default:
            return state
    }
}

const addRequest = (content) => ({ type: exerciseConstants.ADD_NEW_REQUEST, data: content })
const addSuccess = (exercise) => ({ type: exerciseConstants.ADD_NEW_SUCCESS, data: exercise })
const addFailure = (error) => ({ type: exerciseConstants.ADD_NEW_FAILURE, data: error })

const getAllRequest = (exercises) => ({ type: exerciseConstants.GET_ALL_REQUEST, data: exercises })



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

        dispatch(addRequest(content))
        
        //TODO update state after adding new
        //exerciseInitialization()
    }
}



export const exerciseRemoving = (id) => {

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
