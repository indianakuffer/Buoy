import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { destroyUser } from '../../services/users'
import { removeToken } from '../../services/auth'


const AccountDetailsContainer = styled.div`
  
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
          <h1>Hey, {props.currentUser.username}</h1>
          <Link to='/account/edit'><button>Edit Account</button></Link>
          <button onClick={handleDelete}>Delete Account</button>
        </>
      }
    </AccountDetailsContainer>
  )
}
