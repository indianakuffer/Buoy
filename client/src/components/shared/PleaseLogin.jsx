import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Button from './Button'
import { useSpring, animated } from 'react-spring'

const PleaseContainer = styled.div`
  position: absolute;
  width: 100vw;
  top: 0;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
  user-select: none;
`
const Message = styled(animated.div)`
  display: flex;
  flex-flow: column;
  align-items: center;
  font-family: 'Playfair Display', serif;
  font-size: 30px;
  max-width: 400px;
  text-align: center;
  background-color: white;
  color: #086788;
  border-radius: 15px;
  padding: 20px;
  font-weight: bold;
  a {
    margin-top: 40px;
  }
`

export default function PleaseLogin() {
  const flyIn = useSpring({
    from: { opacity: 0, transform: 'translateY(-200%)' },
    to: { opacity: 1, transform: 'translateY(0%)' },
    delay: 1000,
    config: { friction: 30, mass: 2, tension: 170 }
  })

  return (
    <PleaseContainer>
      <Message style={flyIn}>
        Uh oh, looks like you're not logged in!
        <Link to='/login'>
          <Button bgColor='#e64c3c' color='white' forceSize='30px'>Log In</Button>
        </Link>
      </Message>
    </PleaseContainer>
  )
}
