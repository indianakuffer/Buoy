import React, { useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

const SearchBarContainer = styled.div`
  display: flex;
  background-color: white;
`

export default function SearchBar(props) {
  const history = useHistory()
  const [formData, setFormData] = useState({ search: '', })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ search: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (formData.search) {
        props.filterThoughts([], formData.search.split(' '))
      } else {
        props.fetchThoughts()
      }
    } catch (error) {
      alert(error)
    }
  }

  return (
    <SearchBarContainer>
      <form onSubmit={handleSubmit}>
        <label htmlFor='search'>
          <input type='text' name='search' value={formData.search} onChange={handleChange} placeholder='search...'></input>
        </label>
      </form>
    </SearchBarContainer>
  )
}
