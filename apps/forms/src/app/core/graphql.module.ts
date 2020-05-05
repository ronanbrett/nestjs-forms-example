import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

import { InMemoryCache } from 'apollo-cache-inmemory';
import { split, concat } from 'apollo-link';
import { OperationDefinitionNode } from 'graphql';
import { onError } from 'apollo-link-error';

const uri = 'http://localhost:3333/graphql'; // <-- add the URL of the GraphQL server here
const wsUrl = 'ws://localhost:3333/graphql';

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward, response }) => {
    if (graphQLErrors) {
      console.error('apollo errors', graphQLErrors);
    }
    if (networkError) {
      console.error('apollo network errors', networkError);
      if (
        !!networkError['error'] &&
        !!networkError['error']['errors'] &&
        networkError['error']['errors'][0]
      ) {
        console.error('unwrapping apollo network errors');
        networkError.message = networkError['error']['errors'][0].message;
        // you may also be able to set networkError.message to null based on criteria to remove the error, even if you can't prevent an error from being triggered altogether
      }
    }
  }
);

export function createApollo(httpLink: HttpLink) {
  const http = httpLink.create({
    uri
  });

  // Create a WebSocket link:
  const ws = new WebSocketLink({
    uri: wsUrl,
    options: {
      reconnect: true
    }
  });

  const httpLinks = split(
    // split based on operation type
    ({ query }) => {
      const { kind, operation } = getMainDefinition(
        query
      ) as OperationDefinitionNode;
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    ws,
    http
  );

  return {
    link: httpLinks,
    cache: new InMemoryCache(),
    defaultOptions: {
      mutate: {
        errorPolicy: 'all'
      },
      watchQuery: {
        errorPolicy: 'all'
      }
    }
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink]
    }
  ]
})
export class GraphQLModule {}
