import * as z from 'zod';
import { Request, Response, NextFunction } from 'express';
import Status from '../models/ping/status';
import { PingResponse } from '../models/ping/pingResponse';
import { pingRequestSchema } from '../schemas/ping/pingRequestSchema';

export const ping = (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = pingRequestSchema.safeParse(req.body);

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
      let error: z.ZodError = data.error;
      let prettyError = z.prettifyError(error);
      const message = `Ping request schema validation failure. See below for extra detail: ${prettyError}.`;

      return Promise.reject({
        status: 400,
        msg: message,
      });
    }
  } catch (error) {
    next(error);
  }
};
