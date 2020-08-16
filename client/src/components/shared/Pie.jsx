import React from 'react'
import * as d3 from 'd3'
import Slice from './Slice'
import styled from 'styled-components'

const StyledSVG = styled.svg`
  position: fixed;
`

export default function Pie(props) {
  let pie = d3.pie()(props.pieData)

  return (
    <StyledSVG height={props.height} width={props.width}>
      <g transform={`translate(${props.width / 2}, ${props.height / 2})`}>
        <Slice pie={pie} colorList={props.colorList} outerRadius={props.outerRadius} />
      </g>
    </StyledSVG>
  )
}
