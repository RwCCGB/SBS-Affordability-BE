import { Request, Response, NextFunction } from 'express';
import { Region } from '../models/regions/region';
import { loadMock } from '../utils/fileReader';

export const regions = (req: Request, res: Response, next: NextFunction) => {
  const regions: Region[] = [{ id: 1, name: 'Yorkshire & Humberside' }];
  try {
  
    //TODO: Implement service interface to avoid commented code
    //Use Constant 
    res.json(regions)

    // Use Mocks
    //const data = await loadMock<Region[]>("getRegion")
    //res.json(data);
  } catch (error) {
    next(error);
  }
};
