import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { updateUser } from '../../services/users'
import { getAllProfilePics } from '../../services/profile_pics'
import Input from '../shared/Input'
import Button from '../shared/Button'

const AccountEditContainer = styled.div`
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
`
const ProfilePicSection = styled.div`
  display: flex;
  margin-bottom: 20px;
`
const Pic = styled.img`
  background-color: white;
  border-radius: 50%;
  height: 200px;
  margin-right: 20px;
`
const ImageSelect = styled.div`
  display: flex;
  flex-flow: row wrap;
  max-width: 300px;
  img {
    height: 80px;
    border-radius: 50%;
    background-color: white;
    margin: 5px;
  }
`
const EditForm = styled.form`
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 90%;
  label {
    width: 90%;
    max-width: 400px;
    margin: 12px 0;
  }
  button {
    margin-top: 50px;
  }
`
const Art = styled.img`
  position: absolute;
  height: 400px;
  bottom: 0px;
  right: 10%;
  z-index: -1;
`

export default function AccountEdit(props) {
  const history = useHistory()
  const [formData, setFormData] = useState({ username: '', email: '', password: '', confirm: '', profile_pic_id: 2 })
  const [profilePics, setProfilePics] = useState(null)

  useEffect(() => { getProfilePics() }, [])
  useEffect(() => { getUserInfo() }, [props.currentUser])

  const getProfilePics = async () => {
    try {
      const resp = await getAllProfilePics()
      setProfilePics(resp)
    } catch (error) {
      alert(error)
    }
  }

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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Passwords must be filled and matching
    if (formData.password === '') {
      alert('Password cannot be blank')
      return
    }
    if (formData.password !== formData.confirm) {
      alert('Passwords must match')
      return
    }
    // update account info
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
          <ProfilePicSection>
            {profilePics && <Pic src={profilePics[formData.profile_pic_id - 1].image} alt='current profile icon' />}
            <ImageSelect>
              {profilePics && profilePics.map(pic => (
                <img src={pic.image} onClick={() => setFormData({ ...formData, profile_pic_id: pic.id })} alt='potential profile icon' key={`pic-option-${pic.image}`} />
              ))}
            </ImageSelect>
          </ProfilePicSection>
          <EditForm onSubmit={handleSubmit}>
            <label htmlFor='username'>
              <Input type='text' name='username' value={formData.username} onChange={handleChange} placeholder='username' />
            </label>
            <label htmlFor='email'>
              <Input type='text' name='email' value={formData.email} onChange={handleChange} placeholder='email' />
            </label>
            <label htmlFor='password'>
              <Input type='password' name='password' value={formData.password} onChange={handleChange} placeholder='password' />
            </label>
            <label htmlFor='confirm'>
              <Input type='password' name='confirm' value={formData.confirm} onChange={handleChange} placeholder='confirm password' />
            </label>
            <Button bgColor='#e64c3c' color='white' forceSize='30px'>Submit</Button>
          </EditForm>
        </>
      }
      <Art src={require('../../images/lighthouse.svg')} />
    </AccountEditContainer>
  )
}
