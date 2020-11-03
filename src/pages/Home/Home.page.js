import { useAuth0 } from '@auth0/auth0-react'
import { useLocalStorage } from 'react-use'
import React, { useEffect } from 'react'
import Loading from '../../components/Loading.component'
import { gql, useQuery } from '@apollo/client'

const GET_USER = gql`
query MyQuery {
  queryUser {
    email
  }
}
`

function Home() {

  const {loading, error, data} = useQuery(GET_USER)

  if (loading) return <Loading/>;
  if (error) return `Error! ${error.message}`;

  return (
    <div className="Home">
      <h1 className="page-heading">Home</h1>
    </div>    
  )
}

export default Home
