import React, { useState } from 'react'
import styled from 'styled-components'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { removeToken } from '../services/auth'
import ProfilePic from './shared/ProfilePic'
import NavMenu from './NavMenu'

const HeaderContainer = styled.header`
  position: relative;
  box-sizing: content-box;
  width: 100%;
  height: 30px;
  padding: 5px 0;
  display: flex;
  justify-content: space-between;
  user-select: none;
`
const Hamburger = styled.img`
  margin-left: 10px;
`
const Home = styled(Link)`
  color: inherit;
  text-decoration: none;
  font-family: 'Playfair Display', serif;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 1.3px;
`
const Right = styled.div`
  display: flex;
  align-items: center;
  a {
    color: white;
    text-decoration: none;
    margin-right: 15px;
    &:hover {
      text-decoration: underline;
    }
  }
`

export default function Header(props) {
  const history = useHistory()
  const location = useLocation()
  const [showMenu, setShowMenu] = useState(false)

  const logout = async () => {
    props.setCurrentUser(null)
    removeToken()
    history.push('/')
  }

  const toggleMenu = () => { setShowMenu(!showMenu) }

  return (
    <HeaderContainer>
      <Hamburger src={require('../images/hamburger.svg')} onClick={toggleMenu} alt='nav menu icon' />
      {showMenu && <NavMenu toggleMenu={toggleMenu} setCurrentUser={props.setCurrentUser} />}
      {location.pathname !== '/' &&
        <Home to='/'>Buoy</Home>
      }
      <Right>
        {props.currentUser &&
          <>
            <Link to='/account'><ProfilePic size={30} currentUser={props.currentUser} /></Link>
            <a onClick={logout}>Logout</a>
          </>
        }
        {!props.currentUser && location.pathname === '/login' && <Link to='/register'>Register</Link>}
        {!props.currentUser && location.pathname !== '/login' && <Link to='/login'>Login</Link>}
      </Right>
    </HeaderContainer>
  )
}
