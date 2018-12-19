import exerciseService from '../services/exercises'


const reducer = (state = [], action) => {
    switch (action.type) {
        case 'EXERCISES':
            return action.data
        case 'ONE_EXERCISE':
            return action.data
        case 'NEW_EXERCISE':
            return [...state, action.data]
    
        case 'DELETE_EXERCISE':
            break
        case 'UPDATE_EXERCISE':
            break            
        default:
            return state
    }
}

export const exerciseCreation = (content) => {
    return async (dispatch) => {
        const newExercise = await exerciseService.addNew(content)
    
        dispatch({
            type: 'NEW_EXERCISE',
            data: content
        })
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
        console.log(`EXERCISESIT ${exercises}`)
        
        const exercisesArray = Object.values(exercises)
        console.log(exercisesArray)
        
        dispatch({
            type: 'EXERCISES',
            data: exercisesArray
        })
    }
}

export default reducer
