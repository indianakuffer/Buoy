import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useSpring, animated } from 'react-spring'

const NavMenuContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
`
const Menu = styled(animated.div)`
  display: flex;
  background-color: white;
  color: #086788;
  flex-flow: column;
  z-index: 11;
  width: fit-content;
  a {
    color: inherit;
    text-decoration: none;
    padding: 5px 10px;
    &:hover {
      background-color: #086788;
      color: #fbffe2;
    }
  }
`

export default function NavMenu(props) {
  const grow = useSpring({
    from: { transform: 'translate3d(-100%,0,0)' },
    to: { transform: 'translate3d(0%,0,0)' },
    config: { friction: 20 },
  })

  return (
    <NavMenuContainer onClick={props.toggleMenu}>
      <Menu style={grow}>
        <Link to='/account'>My Account</Link>
        <Link to='/thoughts'>My Thoughts</Link>
        <Link to='/thoughts/new'>New Thought</Link>
        <Link to='/sea'>The Sea</Link>
        <Link>Logout</Link>
      </Menu>
    </NavMenuContainer>
  )
}
