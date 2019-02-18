import exerciseReducer from './exerciseReducer'
import deepFreeze from 'deep-freeze'
import { exerciseConstants } from '../constants/exercise.constants'

describe('exerciseReducer', () => {
  it('returns new state with action ADD_NEW_SUCCESS', () => {
    const state = {exercises: []}
    const exercise = {sport: 'Juoksu', distance: 10}
    const action = { 
      type: exerciseConstants.ADD_NEW_SUCCESS, 
      data: exercise 
    }

    deepFreeze(state)
    const newState = exerciseReducer(state, action)

    expect(newState.exercises.length).toBe(1)
    expect(newState.exercises).toContainEqual(action.data)
    expect(newState.adding).toBe(false)
  })
  it('returns new state without deleted instance with action DELETE_REQUEST', () => {
    const state = {exercises: [{id: 123, sport: 'Juoksu'}]}
    const action = {
      type: exerciseConstants.DELETE_REQUEST,
      data: 123
    }
    deepFreeze(state)
    const newState = exerciseReducer(state, action)
    expect(newState.exercises.length).toBe(0)
  })
  it('returns new state with updated instance with action UPDATE_SUCCESS', () => {
    const state = {exercises: [{id: 123, sport: 'Juoksu'}]}
    const updatedExercise = {id: 123, sport: 'Hiihto'}
    const action = {
      type: exerciseConstants.UPDATE_SUCCESS,
      data: updatedExercise
    }
    deepFreeze(state)
    const newState = exerciseReducer(state, action)
    expect(newState.exercises.length).toBe(1)
    expect(newState.exercises).toContainEqual(updatedExercise)
  })

})