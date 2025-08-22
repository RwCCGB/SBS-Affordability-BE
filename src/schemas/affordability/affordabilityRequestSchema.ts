import * as z from 'zod';

export const affordabilityRequestSchema = z
  .object({
    interestOnlyAmount: z.number().positive().min(10000).max(1000000),
    interestRateOfProduct: z.number().positive().max(10),
    isNewBuild: z.boolean(),
    isLongTermFixedProduct: z.boolean(),
    myMortgageApplication: z.object({
      allApplicants: z.array(z.object({
        employmentStatus: z.literal(['E']),
        firstTimeBuyer: z.literal(['Y', 'N']),
        residentialStatus: z.int().positive(),
      })),
      applicationSource: z.int().positive(),
      mortgageFees: z.int().positive(),
      mySharedOwnershipDetails: z.boolean(),
      purchasePrice: z.int().positive(),
      totalLoanAmount: z.number().positive(),
      useDefaultFeeValue: z.boolean(),
    }).refine((data) => 
      data.purchasePrice > (data.totalLoanAmount + data.mortgageFees),
    {
      message:
        'Total loan amount must be less than the sum of purchase price and mortgage fees',
      path: ['checkLoanAmount'],
    },),
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


/*
TODO: Remove this. Just put it here so colleagues can test the schema.
  {
  "interestOnlyAmount": 100000,
  "interestRateOfProduct": 3,
  "isNewBuild": false,
  "isLongTermFixedProduct": true,
  "myMortgageApplication": {
		"allApplicants": [{
			"employmentStatus": "E",
      "firstTimeBuyer": "Y",
      "residentialStatus": 1
		}],
    "applicationSource": 1,
    "mortgageFees": 150,
    "mySharedOwnershipDetails": true,
    "purchasePrice": 100000,
    "totalLoanAmount": 10000,
    "useDefaultFeeValue": true
  },
  "numberOfDependents": 1,
  "region": "Yorkshire & Humberside",
  "repaymentType": "Interest Only",
  "termMonths": 0,
  "termYears": 25,
  "willBeApplicantsMainResidence": true
}
*/
