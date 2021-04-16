import { urlShortener } from './service';

interface WebsiteUrl {
  url: string;
}

const resolvers = {
  Query: {
    shortenUrl: (_: void, { url }: WebsiteUrl) => {
      return urlShortener(url);
    },
  },
};

export default resolvers;
