import React, { useState } from 'react'
import styled from 'styled-components'

const Circle = styled.button`
  background-color: #${props => props.color};
  height: 20px;
  width: 20px;
  border-radius: 50%;
  box-shadow: ${props => props.active ? '0 0 5px' : '0 0'} #2a9d8f;
  margin: 0 3px;
  border: none;   
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
