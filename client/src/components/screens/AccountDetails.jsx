import React from 'react'
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom'
import { destroyUser } from '../../services/users'
import { removeToken } from '../../services/auth'
import Button from '../shared/Button'
import ProfilePic from '../shared/ProfilePic'

const AccountDetailsContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  user-select: none;
  h1 {
    font-family: 'Playfair Display', serif;
    font-weight: 400;
    font-size: 100px;
    margin: 50px 0 50px 0;
  }
  button {
    width: 260px;
    margin: 10px 0;
  }
  .profile-pic {
    margin-bottom: 50px;
  }
`
const Art = styled.img`
  position: absolute;
  height: 400px;
  bottom: 0px;
  right: 10%;
  z-index: -1;
`

export default function AccountDetails(props) {
  const history = useHistory()

  const handleDelete = async () => {
    try {
      await destroyUser(props.currentUser.id)
      handleLogout()
    } catch (error) {
      alert(error)
    }
  }

  const handleLogout = async () => {
    props.setCurrentUser(null)
    removeToken()
    history.push('/')
  }

  return (
    <AccountDetailsContainer className={props.className}>
      {props.currentUser &&
        <>
          <h1>Hey, {props.currentUser.username}!</h1>
          <ProfilePic size={200} currentUser={props.currentUser} />
          <Link to='/account/edit'><Button bgColor='#2a9d8f' color='white' forceSize='30px'>Edit Account</Button></Link>
          <Button onClick={handleDelete} bgColor='#e64c3c' color='white' forceSize='30px'>Delete Account</Button>
        </>
      }
      <Art src={require('../../images/lighthouse.svg')} />
    </AccountDetailsContainer>
  )
}
