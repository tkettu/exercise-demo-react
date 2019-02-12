import React from 'react'
import Plot from 'react-plotly.js'
import store from '../../store'
import { connect } from 'react-redux'
import _ from 'lodash'
import moment from 'moment'

import { arrayToTime, formatDateArray, hoursMinutesToTime, season } from '../../_helpers/timehandlers'
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
 
  const dataOrdered = _.orderBy(data, 'date', 'asc')
  
  
  const weeks = _.map(dataOrdered, ({ date, distance, hours, minutes, sport }) => ({
    'sport': sport,
    'distance': distance,
    'time': hoursMinutesToTime(hours, minutes),
    'daynro': moment(date).isoWeekday(),
    'weekAndYear': moment(date).isoWeek() + '/' + moment(date).year(),
    'monthAndYear': (moment(date).month() + 1) + '/' + moment(date).year(),
    'year': moment(date).year(),
    'yearDayNro': moment(date).dayOfYear(),
    'season': season(date),
  }))

  console.log(weeks)
  
  //const data3 = _.groupBy(weeks, 'weekAndYear')
  const years = _(weeks).groupBy('season')
    .map((values, key) => ({
        'year': key,
        'dist': cumulative_sum(_.map(values, 'distance')),
        'day': _.map(values, 'yearDayNro')

    })).value()
  console.log(years)
    const data4 = []
    _.forEach(years, (value, key) => {
      
       data4.push({
         x: value.day,
         y: value.dist,
         mode: 'line',
         name: value.year
       })
      })
   
  return <Plot
          data={data4}
          layout={ {
            width: 640 , height: 480, title: 'summa', 
            xaxis: { title: 'Paiva' },
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

