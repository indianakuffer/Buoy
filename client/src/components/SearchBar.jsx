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
  @media only screen and (max-width: 600px) {
    max-width: 90%;
  }
`
const SearchForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  input {
    color: #086788; 
    font-size: 20px;
    background: transparent;
    border: none;
    letter-spacing: 1px;
    max-width: 100%;
    &:focus {
      outline: none;
    }
  }
  select {
    border: none;
    color: grey;
    font-size: 18px;
    appearance: none;
    text-align-last: right;
    transform: translateY(1px);
    padding-right: 10px;
    background: transparent;
  }
  @media only screen and (max-width: 600px) {
    &, label {
      max-width: 50%;
    }
    select {
      max-width: 70px;
      height: 100%;
    }
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
  @media only screen and (max-width: 600px) {
    margin-left: 2px;
  }
`
const ColorHalf = styled.div`
  @media only screen and (max-width: 600px) {
      max-width: 50%;
  }
`
const colorList = ['e64c3c', 'f0c419', '086788', 'fbffe2', '2a9d8f']

export default function SearchBar(props) {
  const [formData, setFormData] = useState('')

  const handleChange = (e) => { setFormData(e.target.value) }
  const handleDistance = (e) => { props.setDistanceFilter(parseInt(e.target.value)) }

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
        <SearchForm onSubmit={handleSubmit}>
          <label htmlFor='search'>
            <input type='text' name='search' value={formData} onChange={handleChange} placeholder='search...' autoComplete='off' />
          </label>
          <label htmlFor='search'>
            <select type='text' name='distance' onChange={handleDistance} autoComplete='off'>
              <option value={null} defaultValue hidden>&or;</option>
              <option value={-1}>Any</option>
              <option value={5}>5 mi.</option>
              <option value={10}>10 mi.</option>
              <option value={25}>25 mi.</option>
              <option value={50}>50 mi.</option>
              <option value={100}>100 mi.</option>
              <option value={500}>500 mi.</option>
              <option value={1000}>1000 mi.</option>
              <option value={3000}>3000 mi.</option>
            </select>
          </label>
        </SearchForm>
        <ColorHalf>
          {colorList.map(color => (
            <SearchCircle color={color} setColorList={props.setColorList} colorList={props.colorList} key={`searchCircle${color}`} />
          ))}
          <MagnifyingGlass onClick={handleSubmit}></MagnifyingGlass>
        </ColorHalf>
      </SearchBarContainer>
    </Background>
  )
}
