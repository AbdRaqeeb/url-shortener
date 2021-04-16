import * as express from 'express';
import { Application, Request, Response } from 'express';
import sequelize from './database';
import server from './graphql';
import urlRouter from './routes/url';

const app: Application = express();

sequelize
  .sync()
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(`Err: ${err}`));

server.applyMiddleware({ app, path: '/graphiql' });

app.use('/', urlRouter);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Hello world',
  });
});

export default app;
