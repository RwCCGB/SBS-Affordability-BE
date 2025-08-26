import { Request, Response, NextFunction } from 'express';
import { Region } from '../models/regions/region';

export const regions = (req: Request, res: Response, next: NextFunction) => {
  const regions: Region[] = [{ id: 1, name: 'Yorkshire & Humberside' }];
  try {
    res.json(regions);
  } catch (error) {
    next(error);
  }
};
