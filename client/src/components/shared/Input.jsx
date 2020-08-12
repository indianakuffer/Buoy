import React from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
  border: none;
  width: 100%;
  border-radius: 10px;
  font-size: 22px;
  padding: 5px 20px;
  outline: none;
  color: #086788;
  &::placeholder {
    color: lightgrey;
  }
`

export default function Input(props) {
  return (
    <StyledInput
      type={props.type}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      placeholder={props.placeholder}
    />
  )
}
