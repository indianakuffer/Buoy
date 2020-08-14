import React, { useState } from 'react'
import styled from 'styled-components'
import SearchCircle from './SearchCircle'

const SearchBarContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  background-color: white;
  padding: 5px 10px;
  border-radius: 10px;
  width: fit-content;
  max-width: 100%;
  z-index: 1;
  input {
    color: #086788; 
    font-size: 20px;
    background: transparent;
    border: none;
    letter-spacing: 1px;
    &:focus {
      outline: none;
    }
  }
  @media only screen and (max-width: 600px) {
    width: min-content;
    input {
      margin: 2px 0 5px 0;
    }
  }
`
const Background = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  background: #2c6ed5;
  padding: 20px;
  z-index: 1;
`
const MagnifyingGlass = styled.button`
  width: 20px;
  height: 20px;
  background-image: url('${require('../images/search.svg')}');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-color: transparent;
  border: none;
  margin-left: 15px;
  cursor: pointer;
`
const colorList = ['e64c3c', 'f0c419', '086788', 'fbffe2', '2a9d8f']

export default function SearchBar(props) {
  const [formData, setFormData] = useState('')
  const [selectedColors, setSelectedColors] = useState([])

  const handleChange = (e) => { setFormData(e.target.value) }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let formArray = formData.split(' ')
      if (!formData) { formArray = [] }
      if (!formData && selectedColors.length <= 0) {
        props.fetchThoughts()
      } else {
        props.filterThoughts(selectedColors, formArray)
      }
    } catch (error) {
      alert(error)
    }
  }

  const toggleColor = (hex) => {
    if (selectedColors.includes(hex)) {
      setSelectedColors(selectedColors.filter(color => color !== hex))
    } else {
      setSelectedColors([...selectedColors, hex])
    }
  }

  return (
    <Background>
      <SearchBarContainer>
        <form onSubmit={handleSubmit}>
          <label htmlFor='search'>
            <input type='text' name='search' value={formData} onChange={handleChange} placeholder='search...' />
          </label>
        </form>
        <div>
          {colorList.map(color => (
            <SearchCircle color={color} toggleColor={toggleColor} key={`searchCircle${color}`} />
          ))}
          <MagnifyingGlass onClick={handleSubmit}></MagnifyingGlass>
        </div>
      </SearchBarContainer>
    </Background>
  )
}
