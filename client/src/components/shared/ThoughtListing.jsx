import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const ListingContainer = styled.div`
  background-color: #${props => props.color};
  color: #${props => props.darkText ? '086788' : 'fbffe2'};
`
const TopRow = styled.div`

`
const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
`

export default function ThoughtListing(props) {
  const [darkText, setDarkText] = useState(false)
  const [timestamp, setTimestamp] = useState('')
  const darkList = ['f0c419', 'fbffe2']

  useEffect(() => {

    const date = new Date(props.timestamp)
    const year = new Intl.DateTimeFormat('en', { year: '2-digit' }).format(date)
    const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date)
    const weekday = new Intl.DateTimeFormat('en', { weekday: 'short' }).format(date)
    const day = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(date)
    setTimestamp(`${weekday}, ${month} ${day}.${year}`)

    if (darkList.includes(props.color)) { setDarkText(true) }
  }, [])

  return (
    <ListingContainer color={props.color} darkText={darkText}>
      <TopRow>{props.content}</TopRow>
      <BottomRow>
        <div>{props.likes.length} likes</div>
        <div>
          {props.showTags && props.tags.map((tag) => (
            <span key={`${props.id}-${tag.id}`}>#{tag.name}</span>
          ))}
        </div>
        <div>{timestamp}</div>
      </BottomRow>

    </ListingContainer>
  )
}
