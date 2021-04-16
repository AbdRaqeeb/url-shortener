import { ApolloServer, gql } from 'apollo-server-express';
import resolvers from './query';

const typeDefs = gql`
  type UrlObject {
    id: ID
    code: String
    long_url: String
    short_url: String
    created_at: String
    updated_at: String
  }

  type Url {
    url: String
  }

  type Query {
    shortenUrl(url: String): Url
  }
`;

const server = new ApolloServer({ typeDefs, resolvers });

export default server;
