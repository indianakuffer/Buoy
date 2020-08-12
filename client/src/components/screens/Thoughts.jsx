import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { getUserThoughts } from '../../services/users'
import ThoughtListing from '../shared/ThoughtListing'

const ThoughtsContainer = styled.div`

`

export default function Thoughts(props) {
  const [thoughtList, setThoughtList] = useState(null)

  useEffect(() => {
    if (props.currentUser) { getThoughts() }
  }, [props.currentUser])

  const getThoughts = async () => {
    const thoughtData = await getUserThoughts(props.currentUser.id)
    setThoughtList(thoughtData.data)
  }

  return (
    <ThoughtsContainer className={props.className}>
      <h1>Your Thoughts</h1>
      {thoughtList &&
        thoughtList.map(thought => (
          <ThoughtListing
            thoughtData={thought}
            currentUser={props.currentUser}
            showTags={true}
            source={thoughtList}
            setSource={setThoughtList}
            key={`user-thought-${thought.id}`}
          />
        ))
      }
    </ThoughtsContainer>
  )
}
