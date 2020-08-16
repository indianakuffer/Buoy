import React, { useState } from 'react'
import styled from 'styled-components'
import { useSpring, animated, interpolate } from 'react-spring'
import NewThoughtBox from '../shared/NewThoughtBox'
import Title from '../shared/Title'

const Tab = styled(animated.div)`
  position: absolute;
  display: flex;
  background-color: #e64c3c;
  right: -40px;
  top: 45px;
  height: 40px;
  width: 80px;
  border-radius: 8px;
  z-index: 3;
  overflow: hidden;
  cursor: pointer;
  transition: 0.3s width ease;
`
const Open = styled.div`
  height: 40px;
  width: 40px;
  background-image: url('${require('../../images/plus.svg')}');
  background-size: 30px 30px;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #2a9d8f;
`
const Close = styled.div`
  height: 40px;
  width: 40px;
  background-image: url('${require('../../images/plus.svg')}');
  background-size: 30px 30px;
  background-position: center;
  background-repeat: no-repeat;
  transform: rotate(45deg);
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
      <Tab style={{ transform: spring.interpolate(spring => `translate3d(-${spring}vw,0,0)`) }} onClick={() => setShowNewTab(!showNewTab)}>
        <Open />
        <Close />
      </Tab>
      <Container style={{ transform: spring.interpolate(spring => `translate3d(-${spring}vw,0,0)`) }}>
        <Title>New Thought</Title>
        <NewThoughtBox />
        <Art src={require('../../images/bottle.svg')} alt='message in a bottle' />
      </Container>
    </>
  )
}
