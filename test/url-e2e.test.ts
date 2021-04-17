import * as request from 'supertest';
import { connect } from '../src/test-utils/test-conn';
import { Url } from '../src/database/models/Url';
import app from '../src/app';

const server = () => request(app);

beforeAll(async () => {
  await connect('open');
});

afterAll(async (done) => {
  await connect('close');
  done();
});

interface urlFormat {
  id: number;
  code: string;
  long_url: string;
  short_url: string;
  created_at: Date;
  updated_at: Date;
}

let url: urlFormat;

interface Response {
  status: number;
  body: {
    error: string;
  };
}

const insertUrl = async () => {
  url = await Url.create({
    code: 'abcdef',
    long_url: 'https://github.com/AbdRaqeeb/url-shortener',
    short_url: 'http://localhost:7000/abcde',
  });
};

describe('Url Redirect Endpoint', () => {
  it('should redirect the url', async () => {
    await insertUrl();

    const response: Response = await server().get(`/${url.code}`);

    expect(response.status).toEqual(301);
  });

  it('should return url not found', async (done) => {
    const invalid_code = 'fghjkl';

    const response: Response = await server().get(`/${invalid_code}`);

    expect(response.status).toEqual(404);
    expect(response.body).toMatchObject({
      error: 'Url not found',
    });
    done();
  });
});
