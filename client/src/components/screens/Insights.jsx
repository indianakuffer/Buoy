import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { getUserThoughts } from '../../services/users'
import Title from '../shared/Title'
import { useSpring, useTrail, animated } from 'react-spring'
import { compareValues } from '../../helpers/compareValues'

const InsightsContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  user-select: none;
  height: 100vh;
`
const ScrollContainer = styled.div`
  height: 100%;
  overflow: auto;
`
const SortDropdown = styled.select`
  background: transparent;
  border: 1px solid white;
  color: white;
`
const Grid = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 90%;
  max-width: 800px;
`
const Square = styled(animated.div)`
  height: 20px;
  width: 20px;
  text-align: center;
  margin: 2px;
  background: #${props => props.color};
`

export default function Insights(props) {
  const [thoughtList, setThoughtList] = useState([])
  const [rerender, setRerender] = useState(0)

  const trail = useTrail(thoughtList.length, {
    to: { opacity: 1, x: 0 },
    from: { opacity: 0, x: 20 },
    config: { mass: 5, tension: 2000, friction: 200 }
  })

  const thoughtCount = useSpring({
    number: thoughtList.length,
    from: { number: 0 },
    config: { mass: 5, tension: 200, friction: 200 }
  })

  useEffect(() => {
    if (props.currentUser) { getThoughts() }
  }, [props.currentUser])

  const getThoughts = async () => {
    const thoughtData = await getUserThoughts(props.currentUser.id)
    setThoughtList(thoughtData.data)
  }

  const handleSort = async (e) => {
    const value = e.target.options[e.target.selectedIndex].value.split(' ')
    setThoughtList(thoughtList.sort(compareValues(value[0], value[1])))
    setRerender(rerender + 1)
  }

  return (
    <InsightsContainer>
      <Title fontSize='50px'>You've made {thoughtList && <animated.span style={{ fontSize: '60px' }}>{thoughtCount.number.interpolate(num => Math.ceil(num))}</animated.span>} thoughts.</Title>
      <ScrollContainer>
        <SortDropdown onChange={e => handleSort(e)}>
          <option value="" defaultValue disabled hidden>Sort by:</option>
          <option value='created_at desc'>Date: New to Old </option>
          <option value='created_at asc'>Date: Old to New</option>
          <option value='color desc'>Color: Most to Least</option>
          <option value='color asc'>Color: Least to Most</option>
        </SortDropdown>
        <Grid rerender={rerender}>
          {trail.map(({ x, ...rest }, index) => (
            <Square
              key={`square-${thoughtList[index].id}`}
              color={thoughtList[index].color}
              style={{ ...rest, transform: x.interpolate(x => `translateY(${x}px)`) }}
            />
          ))}
        </Grid>
      </ScrollContainer>
    </InsightsContainer>
  )
}
