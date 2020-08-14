import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Button from '../shared/Button'

const LandingContainer = styled.div`
  display: flex;
  flex-flow: column;
  font-family: 'Playfair Display', serif;
  h1 {
    font-weight: 400;
    font-size: 220px;
    margin: 0 0 0 100px;
  }
  p {
    width: 70%;
    align-self: center;
    line-height: 1.6;
    font-size: 36px;
    max-width: 1200px;
  }
  a {
    margin-top: 100px;
    align-self: center;
  }
  @media only screen and (max-width: 768px) {
    h1 {
      font-size: 180px;
    }
    p {
      width: 80%;
    }
    a {
      margin-top: 50px;
    }
  }
  @media only screen and (max-width: 600px) {
    h1 {
      font-size: 120px;
      margin: 40px 0 0 20px;
    }
    p {
      width: 80%;
      font-size: 28px;
    }
    a {
      margin-top: 100px;
    }
  }
`
const Art = styled.img`
  position: absolute;
  height: 250px;
  bottom: 20px;
  right: 10%;
  z-index: -1;
  animation: sine 4s alternate infinite ease-in-out;
  @keyframes sine {
    to { transform: translatey(50px);}
  }
  @media only screen and (max-width: 768px) {
    height: 200px;
    right: 5%;
  }
`

export default function Landing(props) {
  return (
    <LandingContainer>
      <h1>Buoy</h1>
      <p>Excited? Worried? Hungry? Write down your thoughts and feelings and cast them out to sea, then sit and watch the thoughts of others slowly drift by.
        Connect. Commiserate. Meditate. Share how you're doing. There are no names or judgements here.</p>
      <Link to='/register'><Button bgColor='#e64c3c' color='white' forceSize='34px'>Let's Get Started!</Button></Link>
      <Art src={require('../../images/buoy.svg')} alt='buoy' />
    </LandingContainer>
  )
}
