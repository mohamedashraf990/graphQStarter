import '../styles/globals.css'
import { ApolloClient, InMemoryCache, gql, useQuery, ApolloProvider } from "@apollo/client";

function MyApp({ Component, pageProps }) {
  return <ApolloProvider client={client}>
    <Component {...pageProps} />
  </ApolloProvider>
}
const client = new ApolloClient({
  uri: 'https://graphql-sfv4.zyda.com/graphql',
  cache: new InMemoryCache()
});
export default MyApp