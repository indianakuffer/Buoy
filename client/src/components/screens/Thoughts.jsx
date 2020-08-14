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
  overflow: hidden;
`
const ThoughtsFeed = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  min-width: 300px;
  margin-top: 50px;
  height: 70vh;
  overflow: auto;
  max-width: 90%;
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
  >* {
    margin: 10px 0;
  }
`
const Art = styled.img`
  position: absolute;
  height: 350px;
  bottom: 20px;
  right: 5%;
  z-index: -1;
  animation: sine 4s alternate infinite ease-in-out;
  @keyframes sine {
    to { transform: translatey(50px);}
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
      <Art src={require('../../images/bottle.svg')} alt='message in a bottle' />
    </ThoughtsContainer>
  )
}
