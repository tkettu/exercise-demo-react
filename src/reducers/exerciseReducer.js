import exerciseService from '../services/exercises'
import { exerciseConstants } from '../constants/exercise.constants'
import { errorMsg, successMsg, clearMsg } from './messageReducer'
import _ from 'lodash'
import { tableConstants } from '../constants/table.constants'

const timeout = 5000

const initialState = {
    adding: false,
    exercises: [],
    column: null,
    direction: null
    //FILTER: ...
}

const sortedData = (data, direction, column) => (
     direction === 'ascending' ? 
                    _.sortBy(data, [column]) :
                    _.sortBy(data, [column]).reverse()
)

const reducer = (state = initialState, action) => {
    const oldExercises = state.exercises
    let newExercises = state.exercises

    switch (action.type) {
        
        case exerciseConstants.GET_ALL_REQUEST:    
        case exerciseConstants.GET_SPORTS_REQUEST:
        case exerciseConstants.GET_ONE_REQUEST:
             return { 
                 exercises: _.sortBy(action.data, [tableConstants.INITIAL_SORT_COLUMN]).reverse(),
                 column: tableConstants.INITIAL_SORT_COLUMN
                }
        case exerciseConstants.ADD_NEW_REQUEST:
            return { adding: true, exercises: state.exercises, column: state.column, direction: state.direction }         
        case exerciseConstants.ADD_NEW_SUCCESS:
            newExercises = sortedData([...oldExercises, action.data], state.direction, state.column )
             return { 
                adding: false, 
                exercises:  newExercises,
                column: state.column,
                direction: state.direction
            }  
        case exerciseConstants.ADD_NEW_FAILURE:
            //newExercises = state.exercises
            return { 
                adding: false, 
                //exercises: _.sortBy(state.exercises, [state.column]),
                exercises: sortedData(state.exercises, state.direction, state.column),
                column: state.column,
                direction: state.direction
            } 
        case exerciseConstants.DELETE_REQUEST:
            const index = oldExercises.findIndex(e => e.id === action.data)
            if (index === -1) return state
            newExercises = oldExercises.slice(0, index)
                        .concat(oldExercises.slice(index+1, oldExercises.length)) 
            return {
                //exercises: _.sortBy(newExercises, [state.column]), 
                exercises: sortedData(newExercises, state.direction, state.column), 
                column: state.column,
                direction: state.direction}
        case exerciseConstants.UPDATE_REQUEST:
            const updatedExercise = action.data.exercise
            const id = updatedExercise.id
            newExercises = state.exercises.map(exercise => 
                exercise.id !== id ? exercise : updatedExercise)
            return {
                exercises: sortedData(state.exercises.map(exercise => 
                    exercise.id !== id ? exercise : updatedExercise), state.direction, state.column),
                column: state.column,
                direction: state.direction
                }
        
        /* case tableConstants.UPDATE_TABLE:
            //data = state.exercises
            const sortedData = state.direction === 'ascending' ? 
                                _.sortBy(state.exercises, [state.column]) :
                                _.sortBy(state.exercises, [state.column]).reverse()
            return { 
                column: state.column,
                exercises: sortedData,
                direction: state.direction
            } */
        case tableConstants.SORT_TABLE:
          
            const clickedColumn = action.data
            if(state.column !== clickedColumn) {
                return {
                  column: clickedColumn,
                  exercises: _.sortBy(state.exercises, [clickedColumn]),
                  direction: 'ascending',

                }
              }
            return {
                column: state.column,
                exercises: state.exercises.reverse(),
                direction: state.direction === 'ascending' ? 'descending' : 'ascending',
            }
        case tableConstants.INIT_TABLE:
            //data = state.exercises
            return {
                column: tableConstants.INITIAL_SORT_COLUMN,
                exercises: _.sortBy(state.exercises, [tableConstants.INITIAL_SORT_COLUMN]).reverse(),
            }
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

export const sortExercises = (column) => {
  
    return dispatch => {
        dispatch({
            type: tableConstants.SORT_TABLE,
            data: column
        })
    }
}

export const initTable = () => {
    return dispatch => {
        dispatch({
            type: tableConstants.INIT_TABLE
        })
    }
}

export default reducer
