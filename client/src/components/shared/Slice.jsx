import React from 'react'
import * as d3 from 'd3'

export default function Slice(props) {
  let { pie } = props
  let arc = d3.arc().innerRadius(0).outerRadius(props.outerRadius)

  return (
    <>
      {pie.map((slice, index) => {
        return <path key={`slice-${props.colorList[index]}`} d={arc(slice)} fill={`#${props.colorList[index]}`} />
      })}
    </>
  )
}
