import { useMutation, gql, useLazyQuery } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/User.context';
import Loading from '../components/Loading.component';
import { formatRFC3339 } from 'date-fns';
import { AlertContext } from '../contexts/Alert.context';

const ADD_USER = gql`
mutation AddUser($email: String!, $name: String, $picture: String, $createdAt: DateTime!) {
  addUser(input: [{email: $email, name: $name, picture: $picture, createdAt: $createdAt}]){
    user{
      id
      email
    }
  }
}
`;

const GET_USER = gql`
  query GetUser($email: String!) {
    getUser(email: $email){
      id
    }
  }
`

function UserOnboarding() {
  const { state: { user }, setToken, setUser } = useContext(UserContext);
  const { isLoading, isAuthenticated, getIdTokenClaims } = useAuth0();
  const [isNewUser, setIsNewUser] = useState(false)
  const { setAlert } = useContext(AlertContext)

  const onError = (error) => {
    setAlert("error")
  }

  const onUserFetchCompleted = (data) => {
    if(!data.getUser){
      setIsNewUser(true)
    }
  }

  const [addUserSubmit] = useMutation(ADD_USER, { onError })
  const [getUserLazily] = useLazyQuery(GET_USER, {onCompleted: onUserFetchCompleted, onError})

  useEffect(() => {
    (async () => {
      if (isAuthenticated) {
        const idTokenClaims = await getIdTokenClaims();
        setToken(idTokenClaims.__raw)
        setUser(idTokenClaims)
      }
    })();// eslint-disable-next-line
  }, [isAuthenticated, getIdTokenClaims]);

  useEffect(() => {
    if (user) {
      getUserLazily({
        variables: {
          email: user.email
        }
      })
    } // eslint-disable-next-line
  }, [user, isAuthenticated])

  useEffect(() => {
    if(isNewUser){
      addUserSubmit({
        variables: {
          email: user.email,
          name: user.name || user.nickname,
          picture: user.picture,
          createdAt: formatRFC3339(Date.now())
        }
      })
    } // eslint-disable-next-line
  }, [isNewUser])

  if (isLoading) {
    return <Loading />;
  }
  return (
    <></>
  )
}

export default UserOnboarding