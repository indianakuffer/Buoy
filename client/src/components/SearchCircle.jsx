import React, { useState } from 'react'
import styled from 'styled-components'

const Circle = styled.button`
  background-color: #${props => props.color};
  height: 20px;
  width: 20px;
  border-radius: 50%;
  filter: saturate(${props => props.active ? '1' : '0.2'});
  margin: 0 3px;
  border: none;   
`

export default function SearchCircle(props) {
  const [active, setActive] = useState(true)

  const handleClick = () => {
    if (props.colorList.includes(props.color)) {
      props.setColorList(props.colorList.filter(color => color !== props.color))
    } else {
      props.setColorList([...props.colorList, props.color])
    }
    setActive(!active)
  }

  return (
    <Circle onClick={handleClick} color={props.color} active={active} />
  )
}
