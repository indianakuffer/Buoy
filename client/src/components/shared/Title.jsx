import React from 'react'
import styled from 'styled-components'

const TitleContainer = styled.h1`
  font-family: 'Playfair Display', serif;
  font-weight: ${props => props.fontWeight ? props.fontWeight : 400};
  font-size: ${props => props.fontSize ? props.fontSize : '100px'};
  margin: ${props => props.margin ? props.margin : '50px 0 0 0'};
`

export default function Title(props) {
  return (
    <TitleContainer
      fontSize={props.fontSize}
      fontWeight={props.fontWeight}
      color={props.color}
      margin={props.margin}
    >
      {props.children}
    </TitleContainer>
  )
}
