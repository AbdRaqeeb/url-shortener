import { createTestClient } from 'apollo-server-integration-testing';
import server from './index';
import { connect } from '../test-utils/test-conn';
import { ExecutionResult } from 'graphql';

beforeAll(async () => {
  await connect('open');
});

afterAll(async (done) => {
  await connect('close');
  done();
});

describe('Shorten Url Resolver', () => {
  const SHORTEN_URL = `
      query ShortenUrl($url: String) {
        shortenUrl(url: $url) {
          url
        }
      }
  `;

  it('should shorten a url', async () => {
    const { query } = createTestClient({
      apolloServer: server,
      extendMockRequest: {
        protocol: 'http',
        get: (host: string): string => {
          if (host === 'host') {
            return 'localhost:7000';
          }
        },
      },
    });

    const response: ExecutionResult<{ shortenUrl: { url: string } }> = await query(SHORTEN_URL, {
      variables: {
        url: 'https://github.com/AbdRaqeeb/url-shortener',
      },
    });

    expect(response).toHaveProperty('data.shortenUrl.url');
    expect(response.data.shortenUrl.url).toBeTruthy();
  });

  it('should return a user input error', async () => {
    const { query } = createTestClient({
      apolloServer: server,
      extendMockRequest: {
        protocol: 'http',
        get: (host: string): string => {
          if (host === 'host') {
            return 'localhost:7000';
          }
        },
      },
    });

    const response = await query(SHORTEN_URL, {
      variables: {
        url: 'https  //github.com gdt2',
      },
    });

    expect(response).toMatchObject({
      errors: [
        {
          message: 'UserInputError: The url provided is not valid',
        },
      ],
    });
  });
});
