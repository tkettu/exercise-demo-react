import React from 'react'
import { shallow } from 'enzyme'
import { ExerciseTable } from './ExerciseTable'

describe('<ExerciseTable />', () => {
  it('renders sortable table', () => {
      const testData = [
        {
          id: 123,
          sport: 'Juoksu',
          distance: 12,
          hours: 1,
          minutes: 15,
          date: '1.1.2019'
        },
        {
          id: 124,
          sport: 'Hiihto',
          distance: 25,
          hours: 2,
          minutes: 0,
          date: '4.1.2019'
        }
      ]
      const props = { data: testData}

      const exerciseTableComponent = shallow(<ExerciseTable props={props} />).dive()

      const table = exerciseTableComponent.find('table')
      console.log(exerciseTableComponent)
      
      console.log(table)
      
  })
})