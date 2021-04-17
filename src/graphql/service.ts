import { UserInputError, ValidationError } from 'apollo-server-express';
import * as validUrl from 'valid-url';
import { customAlphabet } from 'nanoid';
import { Url } from '../database/models/Url';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz', 6);

export const validateUrl = (url: string): boolean => {
  // check url passed in
  if (typeof url !== 'string') {
    throw new ValidationError('The input provided is not a string');
  }

  if (!validUrl.isWebUri(url)) {
    throw new UserInputError('The url provided is not valid');
  }

  return true;
};

export interface shortenUrlFormat {
  url: string;
}

export const urlShortener = async (url: string, base_url: string): Promise<shortenUrlFormat> => {
  try {
    // validate url
    validateUrl(url);

    const found_url = await Url.findOne({
      where: {
        long_url: url,
      },
    });

    if (found_url) {
      return {
        url: found_url.short_url,
      };
    }

    // url code
    const code = nanoid();
    const short_url = `${base_url}/${code}`;

    const new_url = await Url.create({
      short_url,
      code,
      long_url: url,
    });

    return {
      url: new_url.short_url,
    };
  } catch (err) {
    console.log('ERROR: ', err);
    throw new Error(err);
  }
};
