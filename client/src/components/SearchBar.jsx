import React, { useState } from 'react'
import styled from 'styled-components'

const SearchBarContainer = styled.div`
  display: flex;
  background-color: white;
`

export default function SearchBar(props) {
  const [formData, setFormData] = useState({ search: '', })

  const handleChange = (e) => {
    setFormData({ search: e.target.value })
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
