import * as z from 'zod';

export const affordabilityRequestSchema = z
  .object({
    interestOnlyAmount: z.number().positive().min(10000).max(1000000),
    interestRateOfProduct: z.number().positive().max(10),
    isNewBuild: z.boolean(),
    isLongTermFixedProduct: z.boolean(),
    myMortgageApplication: z.string().min(5).max(10),
    numberOfDependents: z.int().positive().max(10),
    region: z.string(),
    repaymentType: z.literal(['Repayment', 'Interest Only']),
    termMonths: z.int().min(0).max(12),
    termYears: z.int().positive().max(40),
    willBeApplicantsMainResidence: z.boolean(),
  })
  .refine(
    /*TODO: remove this. I put it here merely to demonstrate that you can do conditional validation on combinations of fields*/
    (data) =>
      data.repaymentType === 'Interest Only' &&
      data.region === 'Yorkshire & Humberside',
    {
      message:
        'Interest Only available to residents of Yorkshire & Humberside only',
      path: ['checkRegion'],
    },
  );
