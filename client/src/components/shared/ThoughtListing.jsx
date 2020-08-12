import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { likeThought, destroyThought } from '../../services/thoughts'

const ListingContainer = styled.div`
  position: relative;
  background-color: #${props => props.color};
  color: #${props => props.darkText ? '086788' : 'fbffe2'};
  border: ${props => props.liked ? '4px solid red' : 'none'};
`
const TopRow = styled.div`
`
const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
`
const Delete = styled.div`
  position: absolute;
  right: 0;
`

export default function ThoughtListing(props) {
  const [darkText, setDarkText] = useState(false)
  const [timestamp, setTimestamp] = useState('')
  const darkList = ['f0c419', 'fbffe2']
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    // format timestamp
    const date = new Date(props.thoughtData.created_at)
    const year = new Intl.DateTimeFormat('en', { year: '2-digit' }).format(date)
    const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date)
    const weekday = new Intl.DateTimeFormat('en', { weekday: 'short' }).format(date)
    const day = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(date)
    setTimestamp(`${weekday}, ${month} ${day}.${year}`)
    // if color is in darklist, set font-color as dark
    if (darkList.includes(props.thoughtData.color)) { setDarkText(true) }
    // if thought is already liked by user, set liked state true
    props.thoughtData.likes.forEach(like => { if (like.user_id === props.currentUser.id) { setLiked(true) } })
  }, [])

  const toggleLike = async () => {
    try {
      const resp = await likeThought(props.thoughtData.id)
      setLiked(!liked)
    } catch (error) {
      alert(error)
    }
  }

  const deleteThought = async () => {
    try {
      await destroyThought(props.thoughtData.id)
      props.setSource(props.source.filter(thought => thought.id !== props.thoughtData.id))
    } catch (error) {
      alert(error)
    }
  }

  return (
    <ListingContainer color={props.thoughtData.color} darkText={darkText} liked={liked}>
      {props.currentUser && props.thoughtData.user_id === props.currentUser.id && <Delete onClick={deleteThought}>x</Delete>}
      <TopRow>{props.thoughtData.content}</TopRow>
      <BottomRow>
        <div onClick={toggleLike}>{props.thoughtData.likes.length} likes</div>
        <div>
          {props.showTags && props.thoughtData.tags.map((tag) => (
            <span key={`${props.thoughtData.id}-${tag.id}`}>#{tag.name}</span>
          ))}
        </div>
        <div>{timestamp}</div>
      </BottomRow>

    </ListingContainer>
  )
}
