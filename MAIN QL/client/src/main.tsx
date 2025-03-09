import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import { GRAPHQL_ENDPOINT } from "./Way1.tsx"

const client = new ApolloClient({
  uri: GRAPHQL_ENDPOINT,
  cache: new InMemoryCache()
});


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client} >

      <App />
    </ApolloProvider>
  </StrictMode>,
)
