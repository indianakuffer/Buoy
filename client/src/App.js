import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components'
import { verifyUser } from './services/auth';
import { Route, Switch } from 'react-router-dom'
import { useTransition, animated } from 'react-spring'
import { __RouterContext } from 'react-router'
import Landing from './components/screens/Landing'
import Header from './components/Header';
import Login from './components/screens/Login';
import Register from './components/screens/Register';
import AccountDetails from './components/screens/AccountDetails';
import AccountEdit from './components/screens/AccountEdit';

const MainContainer = styled.main`
  position: relative;
  .screen {
    position: absolute;
  }
`

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const { location } = useContext(__RouterContext)

  useEffect(() => {
    handleVerify()
  }, [])

  const handleVerify = async () => {
    const userData = await verifyUser()
    setCurrentUser(userData)
  }

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
                <Landing
                  className='screen'
                />
              </Route>
              <Route exact path='/login'>
                <Login
                  className='screen'
                  setCurrentUser={setCurrentUser}
                />
              </Route>
              <Route exact path='/register'>
                <Register
                  className='screen'
                  setCurrentUser={setCurrentUser}
                />
              </Route>
              <Route exact path='/account'>
                <AccountDetails
                  className='screen'
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              </Route>
              <Route exact path='/account/edit'>
                <AccountEdit
                  className='screen'
                  currentUser={currentUser}
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
