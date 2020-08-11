import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components'
import { verifyUser } from './services/auth';
import { Route, Switch } from 'react-router-dom'
import { useTransition, animated } from 'react-spring'
import { __RouterContext } from 'react-router'
import Landing from './components/screens/Landing'
import Header from './components/Header';
import Login from './components/screens/Login';

const MainContainer = styled.main`
  position: relative;
`

function App() {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => { handleVerify() }, [])

  const handleVerify = async () => {
    const userData = await verifyUser()
    setCurrentUser(userData)
  }

  const { location } = useContext(__RouterContext)
  const transitions = useTransition(location, location => location.pathname, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  return (
    <>
      <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <MainContainer>
        {transitions.map(({ item, props, key }) => (
          <animated.div key={key} style={props}>
            <Switch location={item}>
              <Route exact path='/'>
                <Landing />
              </Route>
              <Route exact path='/login'>
                <Login
                  setCurrentUser={setCurrentUser}
                />
              </Route>
            </Switch>
          </animated.div>
        ))}
      </MainContainer>
    </>
  );
}

export default App;
