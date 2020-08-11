import React, { useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { loginUser } from '../../services/auth'

const LoginContainer = styled.div`
  position: absolute;
`

export default function Login(props) {
  const history = useHistory()
  const [formData, setFormData] = useState({ username: '', password: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const userData = await loginUser(formData)
      props.setCurrentUser(userData)
      history.push('/')
    } catch (error) {
      alert(error)
    }
  }

  return (
    <LoginContainer>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>
          <input type='text' name='username' value={formData.username} onChange={handleChange} placeholder='username'></input>
        </label>
        <label htmlFor='password'>
          <input type='password' name='password' value={formData.password} onChange={handleChange} placeholder='password'></input>
        </label>
        <button>Submit</button>
      </form>
    </LoginContainer>
  )
}
