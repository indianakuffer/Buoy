import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { likeThought, destroyThought } from '../../services/thoughts'

const ListingContainer = styled.div`
  position: relative;
  width: fit-content;
  background-color: #${props => props.color};
  color: #${props => props.darkText ? '086788' : 'fbffe2'};
  border-radius: 10px;
  padding: 5px 8px;
  word-break: break-word;
`
const TopRow = styled.div`
  margin-bottom: 3px;
  font-size: 24px;
  padding-right: 20px;
  transform: translateY(-3px);
`
const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
`
const Likes = styled.div`
  display: flex;
  align-items: center;
  padding-right: 10px;
  user-select: none;
  cursor: pointer;
  div {
    margin-right: 2px;
    height: 12px;
    width: 12px;
    background-image: url('${props => props.liked ? require('../../images/like-full.svg') : require('../../images/like-empty.svg')}');
    background-size: contain;
    background-repeat: no-repeat;
    filter: ${props => {
    if (props.liked) {
      return 'unset'
    } else {
      return props.darkText ? 'unset' : 'saturate(0) brightness(10)'
    }
  }}
}
`
const TagContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  max-width: 85%;
`
const Tag = styled.div`
  margin-right: 10px;
  min-width: fit-content;
`
const Delete = styled.div`
  position: absolute;
  right: 5px;
  cursor: pointer;
  z-index: 1;
  font-size: ${props => props.deleteConfirm === 'x' ? '16px' : '12px'};
  background: ${props => props.deleteConfirm === 'x' ? 'transparent' : '#086788'};
  color: ${props => props.deleteConfirm === 'x' ? 'inherit' : 'white'};
`
const Time = styled.div`
  margin-left: 10px;
`

export default function ThoughtListing(props) {
  const [darkText, setDarkText] = useState(false)
  const [timestamp, setTimestamp] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState('x')
  const [liked, setLiked] = useState(false)
  const darkList = ['f0c419', 'fbffe2']
  // alterby helps simulate the like count increasing/decreasing
  const [alterBy, setAlterBy] = useState(0)

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
    props.thoughtData.likes.forEach(like => {
      if (like.user_id === props.currentUser.id) {
        setLiked(true)
        setAlterBy(-1)
      }
    })
  }, [])

  const toggleLike = async () => {
    try {
      await likeThought(props.thoughtData.id)
      setLiked(!liked)
    } catch (error) {
      alert(error)
    }
  }

  const deleteThought = async () => {
    if (deleteConfirm === 'x') {
      setDeleteConfirm('delete?')
      return
    }
    try {
      await destroyThought(props.thoughtData.id)
      props.setSource(props.source.filter(thought => thought.id !== props.thoughtData.id))
    } catch (error) {
      alert(error)
    }
  }

  return (
    <ListingContainer color={props.thoughtData.color} darkText={darkText} liked={liked}>
      {props.currentUser && props.thoughtData.user_id === props.currentUser.id &&
        <Delete onClick={deleteThought} deleteConfirm={deleteConfirm}>{deleteConfirm}</Delete>
      }
      <TopRow>{props.thoughtData.content}</TopRow>
      <BottomRow>
        <Likes onClick={toggleLike} liked={liked} darkText={darkText}>
          <div />
          {props.thoughtData.likes.length + alterBy + liked}
        </Likes>
        <TagContainer>
          {props.showTags && props.thoughtData.tags.map((tag) => (
            <Tag key={`${props.thoughtData.id}-${tag.name}${Math.random(999)}`}>#{tag.name}</Tag>
          ))}
        </TagContainer>
        <Time>{timestamp}</Time>
      </BottomRow>

    </ListingContainer>
  )
}
