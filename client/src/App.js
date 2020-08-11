import React, { useState, useEffect, useContext } from 'react';
import './App.css';
import { verifyUser } from './services/auth';
import { Route, Switch } from 'react-router-dom'
import { useTransition, animated } from 'react-spring'
import { __RouterContext } from 'react-router'
import Landing from './components/screens/Landing'

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
      {transitions.map(({ item, props, key }) => (
        <animated.div key={key} style={props}>
          <Switch location={item}>
            <Route exact path='/' component={Landing} />
          </Switch>
        </animated.div>
      ))}
    </>
  );
}

export default App;
