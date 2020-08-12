import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { updateUser } from '../../services/users'
import { getAllProfilePics } from '../../services/profile_pics'

const AccountEditContainer = styled.div`

`
const ImageSelect = styled.div`
  img {
    height: 80px;
    border-radius: 50%;
  }
`

export default function AccountEdit(props) {
  const history = useHistory()
  const [formData, setFormData] = useState({ username: '', email: '', password: '', confirm: '', profile_pic_id: 2 })
  const [profilePics, setProfilePics] = useState(null)

  useEffect(() => {
    getUserInfo()
  }, [props.currentUser])

  useEffect(() => {
    getProfilePics()
  }, [])

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

  const getProfilePics = async () => {
    try {
      const resp = await getAllProfilePics()
      setProfilePics(resp)
    } catch (error) {
      alert(error)
    }
  }

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
          {profilePics && <img src={profilePics[formData.profile_pic_id - 1].image} alt='current profile icon' />}
          <ImageSelect>
            {profilePics && profilePics.map(pic => {
              return <img src={pic.image} onClick={() => setFormData({ ...formData, profile_pic_id: pic.id })} alt='potential profile icon' key={`pic-option-${pic.image}`} />
            })}
          </ImageSelect>
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
