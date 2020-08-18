import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { getUserThoughts } from '../../services/users'
import Title from '../shared/Title'
import { useSpring, useTrail, animated } from 'react-spring'
import { compareValues } from '../../helpers/compareValues'
import Pie from '../shared/Pie'

const InsightsContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  user-select: none;
  height: 100vh;
`
const ScrollContainer = styled.div`
  display: flex;
  flex-flow: column;
  height: 100%;
  width: 90%;
  max-width: 800px;
  overflow: auto;
  align-items: center;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
  hr {
    border: 1px solid white;
    width: 100%;
    margin: 40px 0;
  }
`
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
`
const SortDropdown = styled.select`
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255,255,255,0.6);
  color: white;
  width: max-content;
  align-self: flex-end;
  margin: 0 0 10px 0;
`
const Grid = styled.div`
  display: flex;
  flex-flow: row wrap;
  max-width: 800px;
`
const Square = styled(animated.div)`
  height: 20px;
  width: 20px;
  text-align: center;
  margin: 2px;
  background: #${props => props.color};
`
const MobileChart = styled.div`
  display: none;
  @media only screen and (max-width: 600px) {
    display: unset;
  }
`
const Chart = styled.div`
  display: visible;
  @media only screen and (max-width: 600px) {
    display: none;
  }
`
const Art = styled.img`
  position: absolute;
  height: 250px;
  bottom: 20px;
  right: 5%;
  z-index: -1;
  animation: sineFlip 6s alternate infinite ease-in-out;
  transform: scaleX(-1);
  @keyframes sineFlip {
    to { transform: translateY(20px) scaleX(-1);}
  }
  @media only screen and (max-width: 768px) {
    height: 100px;
  }
`

export default function Insights(props) {
  const [thoughtList, setThoughtList] = useState([])
  const [rerender, setRerender] = useState(0)
  const [pieData, setPieData] = useState([])
  const [colorList, setColorList] = useState([])

  // Animations
  const trailAnim = useTrail(thoughtList.length, {
    to: { opacity: 1, x: 0 },
    from: { opacity: 0, x: 20 },
    config: { mass: 5, tension: 2000, friction: 200 }
  })

  const thoughtCount = useSpring({
    number: thoughtList.length,
    from: { number: 0 },
    config: { mass: 5, tension: 200, friction: 200 }
  })

  // useEffects
  useEffect(() => {
    if (props.currentUser) { getThoughts() }
  }, [props.currentUser])

  useEffect(() => {
    // Create data for piechart on thoughtList update
    let newData = []
    let mapped = thoughtList.map(thought => thought.color)
    let current = -1
    let alreadySeen = []
    mapped.sort().forEach(color => {
      if (!alreadySeen.includes(color)) {
        current++
        alreadySeen.push(color)
        newData[current] = 1
      } else {
        newData[current]++
      }
    })
    setColorList(alreadySeen)
    setPieData(newData)
  }, [thoughtList])

  // Functions
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
      <Title margin='50px 0'>
        You've cast out {thoughtList &&
          <animated.span>{thoughtCount.number.interpolate(num => Math.ceil(num))}</animated.span>
        } Thoughts
      </Title>
      <ScrollContainer>
        <GridContainer>
          <div>
            <SortDropdown onChange={e => handleSort(e)}>
              <option value="" defaultValue disabled hidden>Sort by:</option>
              <option value='created_at desc'>Date: New to Old </option>
              <option value='created_at asc'>Date: Old to New</option>
              <option value='likes desc'>Likes: Most to Least</option>
              <option value='likes asc'>Likes: Least to Most</option>
            </SortDropdown>
            <Grid rerender={rerender}>
              {trailAnim.map(({ x, ...rest }, index) => (
                <Square
                  key={`square-${thoughtList[index].id}`}
                  color={thoughtList[index].color}
                  style={{ ...rest, transform: x.interpolate(x => `translateY(${x}px)`) }}
                />
              ))}
            </Grid>
          </div>
          <div>
            <Chart>
              <Pie pieData={pieData} colorList={colorList} height={300} width={300} outerRadius={150} />
            </Chart>
            <MobileChart>
              <Pie pieData={pieData} colorList={colorList} height={160} width={160} outerRadius={80} />
            </MobileChart>
          </div>
        </GridContainer>
      </ScrollContainer>
      <Art src={require('../../images/sextant.svg')} alt='sextant' />
    </InsightsContainer>
  )
}
