import { ApolloServer } from 'apollo-server-express';
import { Request } from 'express';
import resolvers from './resolver';
import typeDefs from './type-defs';

interface Context {
  req: Request;
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }: Context) => {
    const base_url = `${req.protocol}://${req.get('host')}`;

    return { base_url };
  },
});

export default server;
