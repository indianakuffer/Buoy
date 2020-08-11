import React, { useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { postThought, giveThoughtTag } from '../../services/thoughts'

const CreateThoughtContainer = styled.div`

`
const NewThought = styled.div`
  display: flex;
  flex-flow: column;
  background-color: ${props => props.color};
`

const StyledForm = styled.form`
  display: flex;
  flex-flow: column;
  input {
    width: 100%;
    background-color: transparent;
    color: #${props => props.textColor};
    border: none;
    :focus {
      outline: none;
    }
  }
`
const Colors = styled.div`
  display: flex;
`
const Circle = styled.div`
  height: 40px;
  width: 40px;
  background-color: #${props => props.color};
  border-radius: 50%;
`

export default function CreateThought(props) {
  const history = useHistory()
  const [formData, setFormData] = useState({ content: '', tag: '', color: 'fbffe2' })
  const [textColor, setTextColor] = useState('086788')
  const [colorList, setColorList] = useState([['e64c3c', 'fbffe2'], ['f0c419', '086788'], ['086788', 'fbffe2'], ['fbffe2', '086788'], ['2a9d8f', 'fbffe2']])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { content, color, tag } = formData
      const resp = await postThought({ content: content, color: color })
      if (tag != '') { setTag(resp.id, tag) }
      history.push('/thoughts')
    } catch (error) {
      alert(error)
    }
  }

  const setTag = async (id, tag) => {
    try {
      const resp = await giveThoughtTag(id, tag)
    } catch (error) {
      alert(error)
    }
  }

  const updateTheme = (background, text) => {
    setFormData({ ...formData, color: background })
    setTextColor(text)
  }

  return (
    <CreateThoughtContainer className={props.className}>
      <h1>How are you feeling?</h1>
      <NewThought color={`#${formData.color}`}>
        <StyledForm textColor={textColor}>
          <label htmlFor='content'>
            <input type='text' name='content' value={formData.content} onChange={handleChange} placeholder='...type here...'></input>
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
      <button onClick={handleSubmit}>Send</button>

    </CreateThoughtContainer>
  )
}
