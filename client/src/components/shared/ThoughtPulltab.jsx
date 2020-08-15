import React, { useState } from 'react'
import styled from 'styled-components'
import { useSpring, animated, interpolate } from 'react-spring'
import NewThoughtBox from '../shared/NewThoughtBox'
import Title from '../shared/Title'

const Tab = styled(animated.div)`
  position: absolute;
  right: 0;
  top: 40px;
  background-color: white;
  height: 40px;
  width: 40px;
  border-radius: 8px 0 0 8px;
  z-index: 2;
  background-image: url('${require('../../images/plus.svg')}');
  background-size: 30px 30px;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #2a9d8f;
  cursor: pointer;
`
const Container = styled(animated.div)`
  position: relative;
  background-color: #2c6ed5;
  display: flex;
  align-items: center;
  flex-flow: column;
  position: absolute;
  right: -100vw;
  top: 0;
  height: 100vh;
  width: 100vw;
  z-index: 2;
`
const CloseButton = styled.div`
  position: absolute;
  user-select: none;
  cursor: pointer;
  left: 20px;
  position: absolute;
  left: 10px;
  top: 10px;
  font-weight: 450;
  font-size: 33px;
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

export default function ThoughtPulltab() {
  const [showNewTab, setShowNewTab] = useState(false)
  const { spring } = useSpring({ spring: showNewTab ? 100 : 0 })

  return (
    <>
      <Tab style={{ transform: spring.interpolate(spring => `translate3d(-${spring}vw,0,0)`) }} onClick={() => setShowNewTab(!showNewTab)} />
      <Container style={{ transform: spring.interpolate(spring => `translate3d(-${spring}vw,0,0)`) }}>
        <CloseButton onClick={() => setShowNewTab(false)}>X</CloseButton>
        <Title>How Are You Doing?</Title>
        <NewThoughtBox />
        <Art src={require('../../images/bottle.svg')} alt='message in a bottle' />
      </Container>
    </>
  )
}
