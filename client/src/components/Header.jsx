import React from 'react'
import styled from 'styled-components'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { removeToken } from '../services/auth'
import ProfilePic from './shared/ProfilePic'

const HeaderContainer = styled.header`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
`

const Right = styled.div`
  display: flex;
  align-items: center;
  a {
    margin-right: 15px;
  }
`

export default function Header(props) {
  const history = useHistory()
  const location = useLocation()

  const logout = async () => {
    props.setCurrentUser(null)
    removeToken()
    history.push('/')
  }

  return (
    <HeaderContainer>
      <div>Hamburger</div>
      <Right>
        {props.currentUser &&
          <>
            <Link to='/account'><ProfilePic size={30} currentUser={props.currentUser} /></Link>
            <button onClick={logout}>Logout</button>
          </>
        }
        {!props.currentUser && location.pathname === '/login' && <Link to='/register'>Register</Link>}
        {!props.currentUser && location.pathname !== '/login' && <Link to='/login'>Login</Link>}
      </Right>
    </HeaderContainer>
  )
}
