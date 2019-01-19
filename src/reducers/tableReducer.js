import { tableConstants } from '../constants/table.constants'
import _ from 'lodash'


//FIXME: Tarvitaanko data täällä, ei varmaankaan, vaan data vain exercisereducerilla
const initialState = { 
  column: tableConstants.INITIAL_SORT_COLUMN,
  direction: null,
  data: []
}

const reducer = (state = initialState, action) => {
  console.log(action.data)
  console.log(state)
  
  const data = []
  switch (action.type) {
    case tableConstants.SORT_TABLE:
      const clickedColumn = action.data.clickedColumn
      //data = action.data.data
      if(state.column !== clickedColumn) {
        return {
          column: clickedColumn,
          data: _.sortBy(state.data, [clickedColumn]),
          direction: 'ascending',
        }
      }
      return {
        column: state.column,
        data: data.reverse(),
        direction: state.direction === 'ascending' ? 'descending' : 'ascending',
      }
    case tableConstants.INIT_TABLE:
      data = action.data
      return {
        column: tableConstants.INITIAL_SORT_COLUMN,
        data: _.sortBy(data, [tableConstants.INITIAL_SORT_COLUMN]).reverse(),
      }
    case tableConstants.UPDATE_TABLE:
      data = action.data
      const sortedData = state.direction === 'ascending' ? 
                            _.sortBy(data, [state.column]) :
                            _.sortBy(data, [state.column]).reverse()
      return { 
        column: state.column,
        data: sortedData,
        direction: state.direction
      }
    
    default:
      return state
  }
}

export const sortTable = ( clickedColumn ) => {
 
  return dispatch => {
 
    dispatch({
      type: tableConstants.SORT_TABLE,
      data: { clickedColumn } 
    })  
  }
}

/* export const initializeTable = (data) => {
  console.log('INITIALIZIN TABLE')
  console.log(data)
  
  
  return dispatch => {
    dispatch({
      type: tableConstants.INIT_TABLE,
      data: data
    })  
  }
} */

export const updateTable = (data) => {
  console.log('UPDATINGH TAbLE')
  
  return dispatch => {
    dispatch({
      type: tableConstants.UPDATE_TABLE,
      data
    })
  }
}


export default reducer