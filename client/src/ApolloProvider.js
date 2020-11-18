import React from 'react'
import App from './App'
import { ApolloClient } from '@apollo/client'
import { InMemoryCache } from '@apollo/client'
import { createHttpLink } from '@apollo/client'
import { ApolloProvider } from '@apollo/client'

// GraphQL HTTP URL
const httpLink = createHttpLink({
    uri: 'https://pacific-hollows-09070.herokuapp.com/'
})

// Apollo client
const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
})

// Export
export default (
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
)