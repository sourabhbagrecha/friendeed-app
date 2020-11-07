import React, { useContext } from 'react'
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { UserContext } from '../contexts/User.context';
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from '@apollo/client/utilities';
import envConfigs from '../configs';

const GRAPHQL_ENDPOINT = envConfigs.slashGraphQLEndpoint;

const AuthorizedApolloProvider = ({ children }) => {
  const { state: { token } } = useContext(UserContext);
  
  const httpLink = createHttpLink({
    uri: `https://${GRAPHQL_ENDPOINT}`,
  });

  const wsLink = new WebSocketLink({
    uri: `wss://${GRAPHQL_ENDPOINT}`,
    options: {
      reconnect: true,
    },
  });

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink
  );

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
    link: authLink.concat(splitLink),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default AuthorizedApolloProvider