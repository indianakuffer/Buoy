import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { updateUser } from '../../services/users'

const AccountEditContainer = styled.div`

`

export default function AccountEdit(props) {
  const history = useHistory()
  const [formData, setFormData] = useState({ username: '', email: '', password: '', confirm: '', profile_pic_id: '' })

  const getUserInfo = () => {
    if (props.currentUser) {
      setFormData({
        ...formData,
        username: props.currentUser.username,
        email: props.currentUser.email,
        profile_pic_id: props.currentUser.profile_pic_id
      })
    }
  }

  useEffect(() => {
    getUserInfo()
  }, [props.currentUser])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.password === '') {
      alert('Password cannot be blank')
      return
    }
    if (formData.password !== formData.confirm) {
      alert('Passwords must match')
      return
    }
    try {
      const { username, email, password, profile_pic_id } = formData
      const newData = { username: username, email: email, password: password, profile_pic_id: profile_pic_id }
      const userData = await updateUser(props.currentUser.id, newData)
      props.setCurrentUser(userData)
      history.push('/account')
    } catch (error) {
      alert(error)
    }
  }

  return (
    <AccountEditContainer className={props.className}>
      <h1>Edit Your Account</h1>
      {props.currentUser &&
        <>
          <form onSubmit={handleSubmit}>
            <label htmlFor='username'>
              <input type='text' name='username' value={formData.username} onChange={handleChange} placeholder='username'></input>
            </label>
            <label htmlFor='email'>
              <input type='text' name='email' value={formData.email} onChange={handleChange} placeholder='email'></input>
            </label>
            <label htmlFor='password'>
              <input type='password' name='password' value={formData.password} onChange={handleChange} placeholder='password'></input>
            </label>
            <label htmlFor='confirm'>
              <input type='password' name='confirm' value={formData.confirm} onChange={handleChange} placeholder='confirm password'></input>
            </label>
            <button>Submit</button>
          </form>
        </>
      }
    </AccountEditContainer>
  )
}
