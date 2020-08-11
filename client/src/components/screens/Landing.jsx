import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const LandingContainer = styled.div`

`

export default function Landing(props) {
  return (
    <LandingContainer className={props.className}>
      <h1>Buoy</h1>
      <p>Brightwork main deck constant bearing earing jack-cross-tree dyogram flagstaff xebec shell plating holystone random leg course zabra capsize screening formula sheer poop deck galley. Leeward bower third mate spirketting stokehold muster drill wing dam razee tuck hawsepiper tsunami rake boltrope fishing dredge spritsail.</p>
      <Link to='/register'><button>Get Started</button></Link>
    </LandingContainer>
  )
}
