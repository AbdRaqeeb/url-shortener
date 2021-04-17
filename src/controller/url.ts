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
      return res.status(404).json({
        error: 'Url not found'
      })
    }

    return res.redirect(301, url.long_url);
  } catch (err) {
    if (process.env.NODE_ENV === 'development' || 'production') {
      console.log('ERROR: ', err);
    }
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};
