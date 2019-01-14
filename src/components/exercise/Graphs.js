import React from 'react'
import Plot from 'react-plotly.js'

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

export const ScatterPlot = ({ x, y, text }) => (
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

