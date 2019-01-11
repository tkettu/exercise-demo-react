import React from 'react'
import Plot from 'react-plotly.js'

export const ScatterPlot = ({x, y}) => (
  <Plot
    data={[
      {x,
       y,
      type: 'scatter',
      mode: 'markers'
      },
    ]}
    layout={ {width: 320, height: 240, title: 'liikunnat'} }
    />
)

