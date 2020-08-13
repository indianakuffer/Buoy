import React, { useState } from 'react'
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom'
import { destroyUser } from '../../services/users'
import { removeToken } from '../../services/auth'
import Button from '../shared/Button'
import ProfilePic from '../shared/ProfilePic'
import Title from '../shared/Title'
import Popup from '../shared/Popup'

const AccountDetailsContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  user-select: none;
  button {
    width: 260px;
    margin: 10px 0;
  }
  .profile-pic {
    margin: 50px 0;
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
  const [showError, setShowError] = useState(false)

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
    <AccountDetailsContainer>
      {props.currentUser &&
        <>
          <Title>Hey, {props.currentUser.username}!</Title>
          <ProfilePic size={200} currentUser={props.currentUser} />
          <Link to='/account/edit'><Button bgColor='#2a9d8f' color='white' forceSize='30px'>Edit Account</Button></Link>
          <Button onClick={() => setShowError(true)} bgColor='#e64c3c' color='white' forceSize='30px'>Delete Account</Button>
        </>
      }
      <Art src={require('../../images/lighthouse.svg')} alt='lighthouse' />
      {showError &&
        <Popup
          content='Are you sure you want to delete your account?'
          buttonText='Yes'
          buttonColor='grey'
          button2Text='No'
          button2Color='#2a9d8f'
          buttonOnClick={handleDelete}
          button2OnClick={() => setShowError(false)}
          closeFunction={() => setShowError(false)} />
      }
    </AccountDetailsContainer>
  )
}
