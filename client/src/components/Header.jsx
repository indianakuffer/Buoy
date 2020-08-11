import React from 'react'
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom'
import { removeToken } from '../services/auth'

const HeaderContainer = styled.header`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
`

export default function Header(props) {
  const history = useHistory()

  const logout = async () => {
    props.setCurrentUser(null)
    removeToken()
    history.push('/')
  }

  return (
    <HeaderContainer>
      Hamburger
      {props.currentUser ?
        <button onClick={logout}>Logout</button>
        :
        <Link to='/login'>Login</Link>
      }
    </HeaderContainer>
  )
}
