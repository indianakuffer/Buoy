import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { postThought, giveThoughtTag } from '../../services/thoughts'
import Button from '../shared/Button'
import Popup from '../shared/Popup'

const NewThought = styled.div`
  position: relative;
  margin: 50px 0;
  display: flex;
  flex-flow: column;
  width: 50%;
  max-width: 400px;
  background-color: ${props => props.color};
  border-radius: 10px;
  padding: 20px 20px 10px 20px;
  @media only screen and (max-width: 768px) {
    width: 50%;
  }
  @media only screen and (max-width: 600px) {
    width: 90%;
  }
`
const StyledForm = styled.form`
  display: flex;
  flex-flow: column;
  input {
    width: 100%;
    background-color: transparent;
    color: #${props => props.textColor};
    border: none;
    ::placeholder {
      color: lightgrey;
    }
    :focus {
      outline: none;
    }
  }
  input[name='content'] {
    font-size: 24px;
  }
`
const Colors = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
`
const Circle = styled.button`
  height: 30px;
  width: 30px;
  margin: 5px;
  background-color: #${props => props.color};
  border-radius: 50%;
  border: none;
  :focus {
    outline: none;
    box-shadow: 0 0 2px 2px white;
  }
`
const CharCount = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  color: ${props => props.length > 40 ? 'red' : '#' + props.textColor};
  font-size: 12px;
`
const colorList = [['e64c3c', 'fbffe2'], ['f0c419', '086788'], ['086788', 'fbffe2'], ['fbffe2', '086788'], ['2a9d8f', 'fbffe2']]

export default function NewThoughtBox() {
  const history = useHistory()
  const [showError, setShowError] = useState(false)
  const [textColor, setTextColor] = useState('086788')
  const [formData, setFormData] = useState({
    content: '',
    tag: '',
    color: 'fbffe2',
    location: { longitude: null, latitude: null }
  })

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setFormData({
          ...formData,
          location: { longitude: position.coords.longitude, latitude: position.coords.latitude }
        })
      })
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { content, color, tag, location } = formData
      if (content.length > 40) {
        setShowError(true)
        return
      }

      const resp = await postThought({ content: content, color: color, location: location })
      // // tags must be checked / set after thought posted
      if (tag != '') {
        setTag(resp.id, tag.replace(/[#,!@$%^&*()<>?:;"]/g, '').split(' '))
      } else {
        redirectPage()
      }
    } catch (error) {
      alert(error)
    }
  }

  const setTag = (id, tagArray) => {
    tagArray.forEach(async (tag) => {
      try {
        await giveThoughtTag(id, tag)
        redirectPage()
      } catch (error) {
        alert(error)
      }
    })
  }

  const redirectPage = () => {
    if (history.location.pathname.includes('sea')) {
      history.go('/sea')
    } else {
      history.push('/sea')
    }
  }

  const updateTheme = (background, text) => {
    // set form to selected background color w/ paired font color
    setFormData({ ...formData, color: background })
    setTextColor(text)
  }

  return (
    <>
      <NewThought color={`#${formData.color}`}>
        <CharCount textColor={textColor} length={formData.content.length}>{formData.content.length}</CharCount>
        <StyledForm textColor={textColor} onSubmit={handleSubmit}>
          <label htmlFor='content'>
            <input type='text' name='content' autocomplete='off' value={formData.content} onChange={handleChange} placeholder={`I'm feeling...`}></input>
          </label>
          <label htmlFor='tag'>
            <input type='text' name='tag' autocomplete='off' value={formData.tag} onChange={handleChange} placeholder='tag'></input>
          </label>
          <input type='submit' style={{ display: 'none' }} />
        </StyledForm>
        <Colors>
          {colorList.map(color => (
            <Circle
              color={color[0]}
              onClick={() => updateTheme(color[0], color[1])}
              key={`circle-${color[0]}`}
            />
          ))}
        </Colors>
      </NewThought>
      <Button bgColor='#e64c3c' color='white' forceSize='30px' onClick={handleSubmit}>Send</Button>
      {showError &&
        <Popup content='Thought must be under 40 characters' closeFunction={() => setShowError(false)} />
      }
    </>
  )
}
