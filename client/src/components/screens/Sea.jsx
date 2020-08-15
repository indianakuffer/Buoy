import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getAllThoughts, searchThoughts } from '../../services/thoughts'
import ThoughtListing from '../shared/ThoughtListing'
import Title from '../shared/Title'
import SearchBar from '../SearchBar'
import ThoughtPullTab from '../shared/ThoughtPulltab'

const SeaContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  user-select: none;
`
const ThoughtsFeed = styled.div`
  display: flex;
  position: absolute;
  flex-flow: column;
  min-width: 300px;
  height: 70vh;
  z-index: 0;
  max-width: 90%;
  >* {
    margin-bottom: 45px;
  }
  animation: scrollUp 5000s linear;
  @keyframes scrollUp {
    from {top: 100vh};
    to { top: -10000vh};
  }
`
const TopCurtain = styled.div`
  position: absolute;
  background: #2c6ed5;
  width: 100vw;
  height: 235px;
  z-index: 1;
`
const Art = styled.img`
  position: absolute;
  height: 350px;
  bottom: 20px;
  right: 5%;
  z-index: -3;
  animation: sineFlip 6s alternate infinite ease-in-out;
  transform: scaleX(-1);
  @keyframes sineFlip {
    to { transform: translateY(20px) scaleX(-1);}
  }
  @media only screen and (max-width: 600px) {
    right: -15%;
    bottom: -50px;
  }
`

export default function Sea(props) {
  const [thoughtList, setThoughtList] = useState(null)
  let [offset, setOffset] = useState(0)
  const [colorList, setColorList] = useState(['e64c3c', 'f0c419', '086788', 'fbffe2', '2a9d8f'])
  let [touchStart, setTouchStart] = useState(0)

  useEffect(() => {
    if (props.currentUser) { fetchThoughts() }
  }, [props.currentUser])

  useEffect(() => {
    window.addEventListener('wheel', handleScroll)
    window.addEventListener('touchstart', processTouchstart)
    window.addEventListener('touchmove', processTouchmove)
    return () => {
      window.removeEventListener('wheel', handleScroll)
      window.removeEventListener('touchstart', processTouchstart)
      window.removeEventListener('touchmove', processTouchmove)
    }
  }, [touchStart])

  const processTouchstart = (e) => {
    let ts = e.touches[0].clientY
    setTouchStart(ts)
  }

  const processTouchmove = (e) => {
    let te = e.changedTouches[0].clientY
    if (te < touchStart) {
      setOffset(offset -= touchStart - te)
    } else {
      setOffset(offset += te - touchStart)
    }
    setTouchStart(te)
  }

  const handleScroll = (e) => {
    setOffset(offset -= e.deltaY)
  }

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
      <ThoughtPullTab />
      <TopCurtain />
      <Title>Sea</Title>
      <SearchBar fetchThoughts={fetchThoughts} filterThoughts={filterThoughts} colorList={colorList} setColorList={setColorList} />
      <ThoughtsFeed style={{ transform: `translateY(${offset}px)` }}>
        {thoughtList &&
          thoughtList.filter(thought => colorList.includes(thought.color)).map(thought => (
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
