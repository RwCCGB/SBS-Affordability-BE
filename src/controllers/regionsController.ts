import { Request, Response, NextFunction } from 'express';
import { Region } from '../models/regions/region';
import { loadMock } from '../utils/fileReader';
import { getRegionService } from '../services/factories/factory';
import config from '../config/config'

export const regions = async (req: Request, res: Response, next: NextFunction) => {

  try {
    
    const service = getRegionService();
    const data = await service.getAll();
    res.json(data);
  } catch (error) {
    next(error);
  }
};
