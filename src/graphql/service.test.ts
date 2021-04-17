import { UserInputError } from 'apollo-server-express';
import { connect } from '../test-utils/test-conn';
import { validateUrl } from './service';
import { urlShortener } from './service';
import { shortenUrlFormat } from './service';

beforeAll(async () => {
  await connect('open');
});

afterAll(async (done) => {
  await connect('close');
  done();
});

describe('Validate Url', () => {
  it('should throw error for invalid url', () => {
    const inValidUrl = () => {
      validateUrl('https  //github.com gdt2');
    };

    expect(inValidUrl).toThrowError(new UserInputError('The url provided is not valid'));
  });
});

describe('URL Shortener Service', () => {
  let url: shortenUrlFormat;

  it('should return a shortened url', async () => {
    const response: shortenUrlFormat = await urlShortener(
      'https://github.com/AbdRaqeeb/url-shortener',
      'http://localhost:7000',
    );

    // store response
    url = response;

    expect(response.url).toMatch(new RegExp('http://localhost:7000'));
  });

  it('should return same shortened url as before', async () => {
    const response: shortenUrlFormat = await urlShortener(
      'https://github.com/AbdRaqeeb/url-shortener',
      'http://localhost:7000',
    );

    expect(response).toEqual(url);
  });
});
