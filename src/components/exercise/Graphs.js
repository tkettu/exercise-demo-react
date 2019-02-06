import React from 'react'
import Plot from 'react-plotly.js'
import store from '../../store'
import { connect } from 'react-redux'
import _ from 'lodash'
import moment from 'moment'

import { arrayToTime, formatDateArray, hoursMinutesToTime } from '../../_helpers/timehandlers'
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
  
  const weeks = _.map(data, ({ date, distance, hours, minutes, sport }) => ({
    'sport': sport,
    'distance': distance,
    'time': hoursMinutesToTime(hours, minutes),
    'daynro': moment(date).weekday(),
    'weekAndYear': moment(date).isoWeek() + '/' + moment(date).year(),
    'monthAndYear': (moment(date).month() + 1) + '/' + moment(date).year()
  }))

  //const data3 = _.groupBy(weeks, 'weekAndYear')
  const data3 = _(weeks).groupBy('weekAndYear')
    .map((values, key) => ({
        'a': key,
        'b': _.map(values, 'distance'),
        'c': _.map(values, 'daynro')

    })).value()
  console.log(data3)
 /*  const data4 = _.forEach(data3, (value, key) => {

  } */

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

