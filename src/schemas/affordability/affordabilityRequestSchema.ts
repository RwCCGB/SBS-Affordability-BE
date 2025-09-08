import * as z from 'zod';

export const affordabilityRequestSchema = z.object({
  numberOfApplicants: z.number().positive().min(1).max(4),
  interestOnlyAmount: z.number().positive().min(10000).max(1000000),
  interestRateOfProduct: z.number().positive().max(10),
  isNewBuild: z.literal([1, 0]),
  isLongTermFixedProduct: z.literal([1, 0]),
  myMortgageApplication: z
    .object({
      allApplicants: z.array(
        z.object({
          allExpenditureItems: z.array(
            z.object({
              myApplicant: z.literal([1, 0]),
              expenditureAmount: z.number().positive(),
              stcExpenditureType: z.int().positive(),
            }),
          ),
          allIncomeItems: z.array(
            z.object({
              myApplicant: z.literal([1, 0]),
              annualAmount: z.number().positive(),
              stcIncomeType: z.int().positive(),
            }),
          ),
          employmentStatus: z.literal([1, 2, 3]),
          firstTimeBuyer: z.literal([1, 0]),
          residentialStatus: z.int().positive(),
        }),
      ),
      applicationSource: z.int().positive(),
      mortgageFees: z.int().positive(),
      mySharedOwnershipDetails: z.literal([1, 0]),
      purchasePrice: z.int().positive(),
      totalLoanAmount: z.number().positive(),
      useDefaultFeeValue: z.literal([1, 0]),
    })
    .refine(
      (data) => data.purchasePrice > data.totalLoanAmount + data.mortgageFees,
      {
        message:
          "Total loan amount must be less than the sum of purchase price and mortgage fees",
        path: ["checkLoanAmount"],
      },
    ),
  numberOfDependents: z.int().positive().max(10),
  region: z.literal([1, 2, 3, 4, 5]),
  repaymentType: z.literal([1, 2]),
  termMonths: z.int().min(0).max(12),
  termYears: z.int().positive().max(40),
  willBeApplicantsMainResidence: z.literal([1, 0]),
});
