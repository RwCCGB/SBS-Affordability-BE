import { Request, Response, NextFunction } from 'express';
import { getRegionService } from '../services/factories/factory';
import logger from '../logger';

export const regions = async (req: Request, res: Response, next: NextFunction) => {

  try {
    logger.info("...getting regions");
    const service = getRegionService();
    const data = await service.getAll();
    res.json(data);
  } catch (error) {
    next(error);
  }
};
