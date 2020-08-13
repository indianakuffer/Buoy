import React, { useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { postThought, giveThoughtTag } from '../../services/thoughts'
import Title from '../shared/Title'
import Button from '../shared/Button'

const CreateThoughtContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  user-select: none;
`
const NewThought = styled.div`
  margin: 50px 0;
  display: flex;
  flex-flow: column;
  background-color: ${props => props.color};
  border-radius: 10px;
  padding: 20px 20px 10px 20px;
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
const colorList = [['e64c3c', 'fbffe2'], ['f0c419', '086788'], ['086788', 'fbffe2'], ['fbffe2', '086788'], ['2a9d8f', 'fbffe2']]

export default function CreateThought(props) {
  const history = useHistory()
  const [formData, setFormData] = useState({ content: '', tag: '', color: 'fbffe2' })
  const [textColor, setTextColor] = useState('086788')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { content, color, tag } = formData
      const resp = await postThought({ content: content, color: color })
      // tags must be checked / set after thought posted
      if (tag != '') { setTag(resp.id, tag) }
      history.push('/thoughts')
    } catch (error) {
      alert(error)
    }
  }

  const setTag = async (id, tag) => {
    try {
      await giveThoughtTag(id, tag)
    } catch (error) {
      alert(error)
    }
  }

  const updateTheme = (background, text) => {
    // set form to selected background color w/ paired font color
    setFormData({ ...formData, color: background })
    setTextColor(text)
  }

  return (
    <CreateThoughtContainer>
      <Title>How are you doing?</Title>
      <NewThought color={`#${formData.color}`}>
        <StyledForm textColor={textColor}>
          <label htmlFor='content'>
            <input type='text' name='content' value={formData.content} onChange={handleChange} placeholder={`I'm feeling...`}></input>
          </label>
          <label htmlFor='tag'>
            <input type='text' name='tag' value={formData.tag} onChange={handleChange} placeholder='tag'></input>
          </label>
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
    </CreateThoughtContainer>
  )
}
