import React, { useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { registerUser } from '../../services/auth'
import Input from '../shared/Input'
import Button from '../shared/Button'

const RegisterContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  user-select: none;
  h1 {
    font-family: 'Playfair Display', serif;
    font-weight: 400;
    font-size: 100px;
    margin: 50px 0 100px 0;
  }
`
const RegisterForm = styled.form`
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
  height: 2000px;
  top: -850px;
  right: -1000px;
  z-index: -1;
  animation: sine 4s alternate infinite ease-in-out;
  @keyframes sine {
    to { transform: translatey(50px);}
  }
`

export default function Register(props) {
  const history = useHistory()
  const [formData, setFormData] = useState({ username: '', email: '', password: '', confirm: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirm) {
      alert('Passwords do not match')
      return
    }
    try {
      const userData = await registerUser(formData)
      props.setCurrentUser(userData)
      history.push('/')
    } catch (error) {
      alert(error)
    }
  }

  return (
    <RegisterContainer className={props.className}>
      <h1>Sign Up</h1>
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
      <Art src={require('../../images/lifepreserve.svg')} />
    </RegisterContainer>
  )
}
