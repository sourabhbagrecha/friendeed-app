import React, { useContext, useEffect, useState } from 'react';
import NavigationMain from './NavigationMain';
import { useLocalStorage } from 'react-use';
import { useAuth0 } from '@auth0/auth0-react';
import './App.css';
import Loading from './components/Loading.component';
import { UserContext } from './contexts/User.context';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import themeConfig from './theme-config';
import { gql, useMutation } from '@apollo/client';

const ADD_USER = gql`
mutation AddUser($email: String!) {
  addUser(input: [{email: $email}]){
    user{
      id
      email
    }
  }
}
`

function App() {
  const { state: {user}, setToken, setUser } = useContext(UserContext);
  const { isLoading, isAuthenticated, getIdTokenClaims } = useAuth0();

  const themeDefinition = createMuiTheme(themeConfig)

  const onError = (error) => {
    console.log({error})
  }
  
  const onCompleted = (data) => {
    console.log({data})
  }
  
  const [addUserSubmit] = useMutation(ADD_USER, { onError, onCompleted })

  useEffect(() => {
    (async () => {
      if (isAuthenticated) {
        const idTokenClaims = await getIdTokenClaims();
        console.log(idTokenClaims)
        setUser(idTokenClaims)
        setToken(idTokenClaims.__raw)
      }
    })();
  }, [isAuthenticated, getIdTokenClaims]);

  useEffect(() => {
    if(user){
      addUserSubmit({
        variables: {
          email: user.email
        }
      })
    }
  }, [user])

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ThemeProvider theme={themeDefinition}>
      <div className="App">
        <div className="mobile-device">
          <NavigationMain />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
