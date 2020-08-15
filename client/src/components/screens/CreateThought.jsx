import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Title from '../shared/Title'
import Button from '../shared/Button'
import Popup from '../shared/Popup'
import NewThoughtBox from '../shared/NewThoughtBox'

const CreateThoughtContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  user-select: none;
`
const Art = styled.img`
  position: absolute;
  height: 350px;
  bottom: 20px;
  right: 5%;
  z-index: -1;
  animation: sine 4s alternate infinite ease-in-out;
  @keyframes sine {
    to { transform: translatey(50px);}
  }
`

export default function CreateThought(props) {

  return (
    <CreateThoughtContainer>
      <Title>How are you doing?</Title>
      <NewThoughtBox />
      <Art src={require('../../images/bottle.svg')} alt='message in a bottle' />
    </CreateThoughtContainer>
  )
}
