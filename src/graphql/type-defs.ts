import { gql } from 'apollo-server-express';

export default gql`
  type UrlType {
    url: String
  }

  type Query {
    shortenUrl(url: String): UrlType
  }
`;
