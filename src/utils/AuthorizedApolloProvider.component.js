import React, { useContext } from 'react'
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { UserContext } from '../contexts/User.context';

const GRAPHQL_ENDPOINT = "https://friendeed.ap-south-1.aws.cloud.dgraph.io/graphql";

const AuthorizedApolloProvider = ({ children }) => {
  const { state: { token } } = useContext(UserContext);
  
  const httpLink = createHttpLink({
    uri: GRAPHQL_ENDPOINT,
  });

  const authLink = setContext(async (_, { headers }) => {
    if(!token){
      return headers
    }

    return {
      headers: {
        ...headers,
        "Authorization": token,
      },
    };
  });

  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default AuthorizedApolloProvider