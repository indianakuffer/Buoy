import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getAllThoughts, searchThoughts } from '../../services/thoughts'
import ThoughtListing from '../shared/ThoughtListing'
import SearchBar from '../SearchBar'

const SeaContainer = styled.div`
`

export default function Sea(props) {
  const [thoughtList, setThoughtList] = useState(null)

  useEffect(() => { if (props.currentUser) { fetchThoughts() } }, [props.currentUser])

  const fetchThoughts = async () => {
    const resp = await getAllThoughts()
    setThoughtList(resp)
  }

  const filterThoughts = async (colorArray, tagArray) => {
    const resp = await searchThoughts(colorArray, tagArray)
    setThoughtList(resp)
  }

  return (
    <SeaContainer className={props.className}>
      <SearchBar fetchThoughts={fetchThoughts} filterThoughts={filterThoughts} />
      <h1>Sea</h1>
      {thoughtList &&
        thoughtList.map(thought => (
          <ThoughtListing
            thoughtData={thought}
            currentUser={props.currentUser}
            source={thoughtList}
            setSource={setThoughtList}
            key={`user-thought-${thought.id}`}
          />
        ))
      }
    </SeaContainer>
  )
}
