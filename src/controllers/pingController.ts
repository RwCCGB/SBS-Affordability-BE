import { Request, Response, NextFunction } from 'express';
import Status from '../models/ping/status';
import { PingResponse } from '../models/ping/pingResponse';
import { validatePingRequest } from 'sbs-affordability-types';
import logger from '../logger';

export const ping = (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info("...ping");
    const data = validatePingRequest(req.body);

    const { success } = data;

    if (success) {
      let ping: PingResponse = {
        status: Status.Active,
        timestamp: new Date(),
        backendIsOnline: true,
        databaseIsonline: true,
      };
      logger.info("ping data was successfully validated and an API response generated");
      res.json(ping);
    } else {
      const { errorMessage } = data;
      logger.error("ping data validation failed and therefore an API reject was issued");
      logger.error(`error summary as follows: ${errorMessage}`);
      return Promise.reject({
        status: 400,
        msg: errorMessage,
      });
    }
  } catch (error) {
    next(error);
  }
};
