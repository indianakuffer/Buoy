import React, { useState } from 'react'
import styled from 'styled-components'

const Circle = styled.div`
  background-color: #${props => props.color};
  height: 20px;
  width: 20px;
  border-radius: 50%;
  border: 2px solid ${props => props.active ? '#086788' : 'transparent'};
`

export default function SearchCircle(props) {
  const [active, setActive] = useState(false)

  const handleClick = () => {
    props.toggleColor(props.color)
    setActive(!active)
  }

  return (
    <Circle onClick={handleClick} color={props.color} active={active} />
  )
}
