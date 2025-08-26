import * as z from 'zod';
import { Request, Response, NextFunction } from 'express';
import { AffordabilityResponse } from '../models/affordability/affordabilityResponse';
import { affordabilityRequestSchema } from '../schemas/affordability/affordabilityRequestSchema';

export const assessAffordability = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = affordabilityRequestSchema.safeParse(req.body);

    const { success } = data;

    if (success) {
      let affordabilityResponse: AffordabilityResponse = {
        maximumLoanAllowed: 100000.0,
        date: new Date(),
      };
      res.json(affordabilityResponse);
    } else {
      let error: z.ZodError = data.error;
      let prettyError = z.prettifyError(error);
      const message = `Affordability request schema validation failure. See below for extra detail: ${prettyError}.`;

      return Promise.reject({
        status: 400,
        msg: message,
      });
    }
  } catch (error) {
    next(error);
  }
};
