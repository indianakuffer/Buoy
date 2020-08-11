import React, { useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { registerUser } from '../../services/auth'

const RegisterContainer = styled.div`

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
      <h1>Register</h1>
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
    </RegisterContainer>
  )
}
