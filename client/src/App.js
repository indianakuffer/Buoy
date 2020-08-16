import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components'
import { verifyUser } from './services/auth';
import { Route, Switch } from 'react-router-dom'
import { useTransition, animated, interpolate } from 'react-spring'
import { __RouterContext } from 'react-router'
import Landing from './components/screens/Landing'
import Header from './components/Header';
import Login from './components/screens/Login';
import Register from './components/screens/Register';
import AccountDetails from './components/screens/AccountDetails';
import AccountEdit from './components/screens/AccountEdit';
// import CreateThought from './components/screens/CreateThought';
import Thoughts from './components/screens/Thoughts';
import Sea from './components/screens/Sea';
import Insights from './components/screens/Insights';
import PleaseLogin from './components/shared/PleaseLogin'

const MainContainer = styled.main`
  position: relative;
  >* {
    position: absolute;
    height: 100vh;
    width: 100%;
    overflow: hidden;
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
    from: { opacity: 1, transform: 'translateY(-20vh)' },
    enter: { opacity: 1, transform: 'translateY(0vh)' },
    leave: { opacity: 0, transform: 'translateY(20vh)' },
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
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              </Route>
              <Route exact path='/register'>
                <Register
                  setCurrentUser={setCurrentUser}
                />
              </Route>
              <Route exact path='/account'>
                <AccountDetails
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
                {!currentUser && <PleaseLogin />}
              </Route>
              <Route exact path='/account/edit'>
                <AccountEdit
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
                {!currentUser && <PleaseLogin />}
              </Route>
              <Route exact path='/thoughts'>
                <Thoughts
                  currentUser={currentUser}
                />
                {!currentUser && <PleaseLogin />}
              </Route>
              {/* <Route exact path='/thoughts/new'>
                <CreateThought
                  currentUser={currentUser}
                />
                {!currentUser && <PleaseLogin />}
              </Route> */}
              <Route exact path='/sea'>
                <Sea
                  currentUser={currentUser}
                />
                {!currentUser && <PleaseLogin />}
              </Route>
              <Route exact path='/insights'>
                <Insights
                  currentUser={currentUser}
                />
                {!currentUser && <PleaseLogin />}
              </Route>
            </Switch>
          </animated.div>
        ))}
      </MainContainer>
    </>
  );
}

export default App;
