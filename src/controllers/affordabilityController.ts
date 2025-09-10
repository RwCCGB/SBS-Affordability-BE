import { Request, Response, NextFunction } from 'express';
import { AffordabilityResponse, AffordabilityResult } from '../models/affordability/affordabilityResponse';
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
      const results = [ AffordabilityResult.Success, AffordabilityResult.Referred, AffordabilityResult.Declined ];
      const index = new Date().getMilliseconds() % results.length;
      const pseudoRandomResult = results[index];
      let affordabilityResponse: AffordabilityResponse = {
        maximumLoanAllowed: 100000.0,
        date: new Date(),
        ltv: calculateLtv(req.body.loanAmount, req.body.propertyValue),
        result: pseudoRandomResult ?? AffordabilityResult.Declined,
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
