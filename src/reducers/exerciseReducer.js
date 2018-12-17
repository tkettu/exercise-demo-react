import exerciseService from '../services/exercises'


const reducer = (state = [], action) => {
    switch (action.type) {
        case 'EXERCISES':
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

export const exerciseCretion = (content) => {
    
}

export const exerciseRemoving = (id) => {

}

export const exerciseUpdating = (content) => {
    
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
