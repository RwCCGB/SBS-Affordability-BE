import { Request, Response, NextFunction } from 'express';
import { Region } from '../models/regions/region';
import { loadMock } from '../utils/fileReader';
import { getRegionService } from '../services/factories/factory';
import config from '../config/config'

export const regions = async (req: Request, res: Response, next: NextFunction) => {

  try {
    let regions: Region[];
    if(config.useMocks){
      regions = await loadMock<Region[]>("getRegion");
    }
    else{
      regions = [{id: 1, name: "Yorkshire & Humberside"}]
    }
    const service = getRegionService();
    const data = service.getAll();
    res.json(data);
  } catch (error) {
    next(error);
  }
};
