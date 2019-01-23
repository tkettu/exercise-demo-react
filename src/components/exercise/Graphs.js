import React from 'react'
import Plot from 'react-plotly.js'
import store from '../../store';
import { connect } from 'react-redux';

import { arrayToTime, formatDateArray } from '../../_helpers/timehandlers'

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
  return <div>SUMMA</div>
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

