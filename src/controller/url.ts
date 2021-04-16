import { Request, Response } from 'express';
import { Url } from '../database/models/Url';

export const urlLoader = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { code } = req.params;

    const url = await Url.findOne({
      where: {
        code,
      },
    });

    if (!url) {
      return errorResponse(404, res, 'Url not found');
    }

    return res.redirect(url.long_url);
  } catch (err) {
    errorResponse(500, res, 'Internal server error', err);
  }
};

const errorResponse = (statusCode: number, res: Response, message: string, err?: Error) => {
  if (err) {
    console.log('ERROR: ', err);
  }
  return res.status(statusCode).json({
    error: message,
  });
};
