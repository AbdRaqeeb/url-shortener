import { urlShortener } from './service';

interface WebsiteUrl {
  url: string;
}

export default {
  Query: {
    shortenUrl: (_: void, { url }: WebsiteUrl, { base_url }) => {
      return urlShortener(url, base_url);
    },
  },
};
