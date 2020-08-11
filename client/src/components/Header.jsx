import React from 'react'
import styled from 'styled-components'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { removeToken } from '../services/auth'

const HeaderContainer = styled.header`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
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
      Hamburger
      <div>
        {props.currentUser &&
          <>
            <Link to='/account'><button>Account</button></Link>
            <button onClick={logout}>Logout</button>
          </>
        }
        {!props.currentUser && location.pathname === '/login' && <Link to='/register'>Register</Link>}
        {!props.currentUser && location.pathname !== '/login' && <Link to='/login'>Login</Link>}
      </div>
    </HeaderContainer>
  )
}
