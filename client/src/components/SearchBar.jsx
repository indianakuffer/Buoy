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
  }
`
const Background = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 20px 0 80px 0;
  z-index: 1;
  background: linear-gradient(#2c6ed5 50%, transparent);
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

  const handleChange = (e) => { setFormData(e.target.value) }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let formArray = formData.split(' ')
      if (!formData) {
        formArray = []
        props.fetchThoughts()
      } else {
        props.filterThoughts(formArray)
      }
    } catch (error) {
      alert(error)
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
            <SearchCircle color={color} setColorList={props.setColorList} colorList={props.colorList} key={`searchCircle${color}`} />
          ))}
          <MagnifyingGlass onClick={handleSubmit}></MagnifyingGlass>
        </div>
      </SearchBarContainer>
    </Background>
  )
}
