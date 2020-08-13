import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getAllThoughts, searchThoughts } from '../../services/thoughts'
import ThoughtListing from '../shared/ThoughtListing'
import Title from '../shared/Title'
import SearchBar from '../SearchBar'

const SeaContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  user-select: none;
  overflow: hidden;
`
const Art = styled.img`
  position: absolute;
  height: 350px;
  bottom: 20px;
  right: 5%;
  z-index: -1;
  animation: sineFlip 6s alternate infinite ease-in-out;
  transform: scaleX(-1);
  @keyframes sineFlip {
    to { transform: translateY(20px) scaleX(-1);}
  }
`
const ThoughtsFeed = styled.div`
  display: flex;
  flex-flow: column;
  min-width: 300px;
  margin-top: 50px;
  height: 70vh;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
  >* {
    margin: 45px 0;
  }
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
    <SeaContainer>
      <SearchBar fetchThoughts={fetchThoughts} filterThoughts={filterThoughts} />
      <Title>Sea</Title>
      <ThoughtsFeed>
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
      </ThoughtsFeed>
      <Art src={require('../../images/telescope.svg')} alt='message in a bottle' />
    </SeaContainer>
  )
}
