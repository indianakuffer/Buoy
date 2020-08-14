import React, { useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { registerUser } from '../../services/auth'
import Input from '../shared/Input'
import Button from '../shared/Button'
import Title from '../shared/Title'
import Popup from '../shared/Popup'

const RegisterContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  user-select: none;
`
const RegisterForm = styled.form`
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 90%;
  margin-top: 100px;
  label {
    width: 90%;
    max-width: 400px;
    margin: 12px 0;
  }
  button {
    margin-top: 50px;
  }
  @media only screen and (max-width: 600px) {
    margin-top: 80px;
  }
`
const Art = styled.img`
  position: absolute;
  height: 2000px;
  top: -850px;
  right: -1000px;
  z-index: -1;
  animation: sine 4s alternate infinite ease-in-out;
  @keyframes sine {
    to { transform: translatey(50px);}
  }
  @media only screen and (max-width: 600px) {
    height: 1600px;
    right: -1250px;
    top: 0px;
  }
`

export default function Register(props) {
  const history = useHistory()
  const [formData, setFormData] = useState({ username: '', email: '', password: '', confirm: '' })
  const [errorMessage, setErrorMessage] = useState('')
  const [showError, setShowError] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirm) {
      setErrorMessage('Passwords must match.')
      setShowError(true)
      return
    }
    try {
      const userData = await registerUser(formData)
      props.setCurrentUser(userData)
      history.push('/')
    } catch (error) {
      console.log(error)
      setErrorMessage(`Please make sure your email is valid, and your username is unique!`)
      setShowError(true)
    }
  }

  return (
    <RegisterContainer>
      <Title>Sign Up</Title>
      <RegisterForm onSubmit={handleSubmit}>
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
        <Button bgColor='#e64c3c' color='white' forceSize='30px'>Register</Button>
      </RegisterForm>
      <Art src={require('../../images/lifepreserve.svg')} alt='life preserver' />
      {showError &&
        <Popup content={errorMessage} closeFunction={() => setShowError(false)} />
      }
    </RegisterContainer>
  )
}
