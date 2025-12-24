import { ApolloClient, InMemoryCache } from '@apollo/client';
const clientId: any = process.env.X_APP_CLIENT_ID;
const apiEndPoint = process.env.STORAGE_API_ENDPOINT;
const storageApolloClient = new ApolloClient({
  uri: apiEndPoint, // URL ของ GraphQL API ของคุณ
  cache: new InMemoryCache(),
  headers: { 'X-APP-CLIENT-ID': clientId },
});

export default storageApolloClient;
