import { Request, Response, NextFunction } from 'express';
import Status from '../models/ping/status';
import { PingResponse } from '../models/ping/pingResponse';
import { validatePingRequest } from 'sbs-affordability-types';

export const ping = (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = validatePingRequest(req.body);

    const { success } = data;

    if (success) {
      let ping: PingResponse = {
        status: Status.Active,
        timestamp: new Date(),
        backendIsOnline: true,
        databaseIsonline: true,
      };
      res.json(ping);
    } else {
      const { errorMessage } = data;
      return Promise.reject({
        status: 400,
        msg: errorMessage,
      });
    }
  } catch (error) {
    next(error);
  }
};
