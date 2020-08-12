import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { getUserThoughts } from '../../services/users'
import ThoughtListing from '../shared/ThoughtListing'
import Title from '../shared/Title'

const ThoughtsContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  user-select: none;
`
const ThoughtsFeed = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  margin-top: 50px;
  height: 70vh;
  overflow: auto;
  >* {
    margin: 10px 0;
  }
`

export default function Thoughts(props) {
  const [thoughtList, setThoughtList] = useState(null)

  useEffect(() => { if (props.currentUser) { getThoughts() } }, [props.currentUser])

  const getThoughts = async () => {
    const thoughtData = await getUserThoughts(props.currentUser.id)
    setThoughtList(thoughtData.data)
  }

  return (
    <ThoughtsContainer>
      <Title>Your Thoughts</Title>
      <ThoughtsFeed>
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
      </ThoughtsFeed>
    </ThoughtsContainer>
  )
}
