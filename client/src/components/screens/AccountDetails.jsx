import React from 'react'
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom'
import { destroyUser } from '../../services/users'
import { removeToken } from '../../services/auth'

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
    <div className={props.className}>
      {props.currentUser &&
        <>
          <h1>Hey, {props.currentUser.username}!</h1>
          <Link to='/account/edit'><button>Edit Account</button></Link>
          <button onClick={handleDelete}>Delete Account</button>
        </>
      }
    </div>
  )
}
