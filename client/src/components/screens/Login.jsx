import React, { useState } from 'react'
import styled from 'styled-components'
import { Link, useHistory, Redirect } from 'react-router-dom'
import { loginUser } from '../../services/auth'
import Button from '../shared/Button'
import Input from '../shared/Input'
import Title from '../shared/Title'
import Popup from '../shared/Popup'

const LoginContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  user-select: none;
`
const LoginForm = styled.form`
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
  a {
    color: white;
    text-decoration: none;
    :hover {
      text-decoration: underline;
    }
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
  @media only screen and (max-width: 768px) {
    right: -1100px;
    top: -885px;
  }
  @media only screen and (max-width: 600px) {
    height: 1600px;
    right: -1250px;
    top: 0px;
  }
`

export default function Login(props) {
  const history = useHistory()
  const [formData, setFormData] = useState({ username: '', password: '' })
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const userData = await loginUser(formData)
      props.setCurrentUser(userData)
      history.push('/sea')
    } catch (error) {
      console.log(error)
      setErrorMessage('Sorry, please try again!')
      setShowError(true)
    }
  }

  if (props.currentUser) { return <Redirect to='/sea' /> }

  return (
    <LoginContainer>
      <Title>Welcome back!</Title>
      <LoginForm onSubmit={handleSubmit}>
        <label htmlFor='username'>
          <Input type='text' name='username' value={formData.username} onChange={handleChange} placeholder='username' />
        </label>
        <label htmlFor='password'>
          <Input type='password' name='password' value={formData.password} onChange={handleChange} placeholder='password' />
        </label>
        <Link to='/register'>Don't have an account?</Link>
        <Button bgColor='#e64c3c' color='white' forceSize='30px'>Log In</Button>
      </LoginForm>
      <Art src={require('../../images/lifepreserve.svg')} alt='life preserver' />
      {showError &&
        <Popup content={errorMessage} closeFunction={() => setShowError(false)} />
      }
    </LoginContainer>
  )
}
