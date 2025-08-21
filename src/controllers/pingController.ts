import { Request, Response, NextFunction } from 'express';
import Status from '../models/ping/status';
import { PingRequest } from '../models/ping/pingRequest';
import { PingResponse } from '../models/ping/pingResponse';
import { pingRequestSchema } from '../schemas/schemas';

export const ping = (req: Request, res: Response, next: NextFunction) => {
  try {
    let myrequest: PingRequest = req.body;

    const data = pingRequestSchema.parse(req.body);

    /*TODO: implement correct functionality*/
    let ping: PingResponse = { status: Status.Active, timestamp: new Date(), backendIsOnline: true, databaseIsonline: true };
    res.json(ping);
  } catch (error) {
    next(error);
  }
};
