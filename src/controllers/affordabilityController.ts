import { Request, Response, NextFunction } from 'express';
import { AffordabilityResponse } from '../models/affordability/affordabilityResponse';
import { validateAffordabilityRequest } from 'sbs-affordability-types';
import { calculateLtv } from '../utils/calculateLtv';

export const assessAffordability = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = validateAffordabilityRequest(req.body);

    const { success } = data;

    if (success) {
      let affordabilityResponse: AffordabilityResponse = {
        maximumLoanAllowed: 100000.0,
        date: new Date(),
        ltv: calculateLtv(req.body.loanAmount, req.body.propertyValue)
      };
      res.json(affordabilityResponse);
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
