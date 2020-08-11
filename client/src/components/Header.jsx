import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const HeaderContainer = styled.header`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
`

export default function Header() {
  return (
    <HeaderContainer>
      Hamburger
      <Link to='/login'>Login</Link>
    </HeaderContainer>
  )
}
