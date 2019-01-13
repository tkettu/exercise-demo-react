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
        yaxis: { title: 'aika (h)' }
              } }
    />
)

