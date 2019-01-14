import exerciseService from '../services/exercises'
import { exerciseConstants } from '../constants/exercise.constants'
import { errorMsg, successMsg, clearMsg } from './messageReducer'

const timeout = 5000

const initialState = {
    adding: false,
    exercises: [],
    //FILTER: ...
}

const reducer = (state = initialState, action) => {
    
    console.log(state)
    const oldExercises = state.exercises
    switch (action.type) {
        
        case exerciseConstants.GET_ALL_REQUEST:    
        case exerciseConstants.GET_SPORTS_REQUEST:
        case exerciseConstants.GET_ONE_REQUEST:
             return { exercises: action.data }
        case exerciseConstants.ADD_NEW_REQUEST:
            return { adding: true, exercises: state.exercises }         
        case exerciseConstants.ADD_NEW_SUCCESS:
            return { 
                adding: false, 
                exercises: [...oldExercises, action.data] 
            }
        case exerciseConstants.ADD_NEW_FAILURE:
            return { 
                adding: false, 
                exercises: state.exercises
            }
        case exerciseConstants.DELETE_REQUEST:
            const index = oldExercises.findIndex(e => e.id === action.data)
            if (index === -1) return state
            const newExercises = oldExercises.slice(0, index)
                        .concat(oldExercises.slice(index+1, oldExercises.length)) 
            return {exercises: newExercises}
        case exerciseConstants.UPDATE_REQUEST:
            const updatedExercise = action.data.exercise
            const id = updatedExercise.id
            return {exercises: state.exercises.map(exercise => 
                                exercise.id !== id ? exercise : updatedExercise)}
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

//TODO: request, success and failures
const updateRequest = (exercise) => ({ type: exerciseConstants.UPDATE_REQUEST, 
                                            data: { exercise: exercise } })

export const exerciseCreation = (content) => {

    return async (dispatch) => {
        dispatch(addRequest(content))
        await exerciseService.addNew(content)
        .then(
            exercise => {
                dispatch(addSuccess(exercise))
                
                dispatch(successMsg(`Lisättiin ${exercise.sport} ${exercise.date}`))
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
} 
/*export const exerciseCreation = (content) => {
    return async (dispatch) => {
        const newExercise = await exerciseService.addNew(content)
        
        dispatch(addRequest(newExercise))
    }
}*/

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
