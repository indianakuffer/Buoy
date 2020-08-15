import React from 'react'
import styled from 'styled-components'

const TitleContainer = styled.h1`
  position: relative;
  font-family: 'Playfair Display', serif;
  font-weight: ${props => props.fontWeight ? props.fontWeight : 400};
  font-size: ${props => props.fontSize ? props.fontSize : '100px'};
  margin: ${props => props.margin ? props.margin : '50px 0 0 0'};
  z-index: 1;
  text-align: center;
  padding: 0 10px;
  @media only screen and (max-width: 600px) {
    line-height: 1.1;
    font-size: ${props => props.fontSize ? props.fontSize : '45px'};
  }
`

export default function Title(props) {
  return (
    <TitleContainer
      style={props.style}
      fontSize={props.fontSize}
      fontWeight={props.fontWeight}
      color={props.color}
      margin={props.margin}
    >
      {props.children}
    </TitleContainer>
  )
}
