import React from 'react'
import Plot from 'react-plotly.js'
import store from '../../store'
import { connect } from 'react-redux'
import _ from 'lodash'

import { arrayToTime, formatDateArray } from '../../_helpers/timehandlers'
import { cumulative_sum } from '../../_helpers/stats'

/* export const ScatterPlot = ({x, y}) => (
  <Plot
    data={[
      {x,
       y,
      type: 'scatter',
      mode: 'markers'
      },
    ]}
    layout={ {width: 640 , height: 480, title: 'liikunnat'} }
    />
) */

//TODO: https://plot.ly/javascript/click-events/
//TODO: Handle data here, handle different sport as different data attribute to legend them correctly
//TODO: weekly, monthly total distance plots, cumulative sums comparing different months, years

/* export const ScatterPlot = ({ x, y, text }) => (
  <Plot
    data={[
      {
        x,
        y,
        text,
        type: 'scatter',
        mode: 'markers',
      },
    ]}
    layout={ {width: 640 , height: 480, title: 'liikunnat', 
        xaxis: { title: 'matka (km)' },
        yaxis: { title: 'aika (h)' },
              } }
    />
) */

export const ScatterPlot = ({ data }) => {
  const x =  _.map(data, 'distance')
  const y = arrayToTime(data)
  const text = formatDateArray(data)
  return (
    <Plot
      data={[
        {
          x,
          y,
          text,
          type: 'scatter',
          mode: 'markers',
        },
      ]}
      layout={ {width: 640 , height: 480, title: 'liikunnat', 
          xaxis: { title: 'matka (km)' },
          yaxis: { title: 'aika (h)' },
                } }
      />
  )
}

export const CumulativeSum = ({ data }) => {
 
  const data2 = _.orderBy(data, 'date', 'asc')
  
  
  const distance = _.map(data2, 'distance')
  const cumsum = cumulative_sum(distance)
  const dates = formatDateArray(data2)
  console.log(dates)
  console.log(cumsum)
 
  //TODO: groupby year, plot years at different line
  //TODO: [{date, distance}...]
   return <Plot
            data={[
              {
                x: dates,
                y: cumsum,
                mode: 'line',
              }, 
            ]}
            layout={ {width: 640 , height: 480, title: 'summa', 
              xaxis: { title: 'pvm' },
              yaxis: { title: 'matka' },
                } }
              /> 
}

const PlotView = (props) => {
  console.log(props.data)
  return (<div>
    <ScatterPlot data={props.data} />
    <CumulativeSum data={props.data} />
  </div>)
  
}

const mapStateToProps = (state) => {
  return {
    data: store.getState().exerciseReducer.exercises
  }
}

export default connect(
  mapStateToProps
)(PlotView)

