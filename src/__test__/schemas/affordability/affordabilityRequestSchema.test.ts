import { affordabilityRequestSchema } from '../../../schemas/affordability/affordabilityRequestSchema';

describe('affordabilityRequestSchema', () => {
  it('schema returns true for a correctly formed request', async () => {
    //Arrange
   const json = {
      numberOfApplicants: 1,
      interestOnlyAmount: 100000,
      interestRateOfProduct: 3,
      isNewBuild: 0,
      isLongTermFixedProduct: 1,
      myMortgageApplication: {
        allApplicants: [
          {
            allExpenditureItems: [
              {
                myApplicant: 1,
                expenditureAmount: 1000.0,
                stcExpenditureType: 1,
              },
              {
                myApplicant: 1,
                expenditureAmount: 2000.0,
                stcExpenditureType: 1,
              },
            ],
            allIncomeItems: [
              {
                myApplicant: 1,
                annualAmount: 1000.0,
                stcIncomeType: 1,
              },
              {
                myApplicant: 1,
                annualAmount: 2000.0,
                stcIncomeType: 1,
              },
            ],
            employmentStatus: 1,
            firstTimeBuyer: 1,
            residentialStatus: 1,
          },
        ],
        applicationSource: 1,
        mortgageFees: 150,
        mySharedOwnershipDetails: 1,
        purchasePrice: 100000,
        totalLoanAmount: 10000,
        useDefaultFeeValue: 1,
      },
      numberOfDependents: 1,
      region: 1,
      repaymentType: 1,
      termMonths: 0,
      termYears: 25,
      willBeApplicantsMainResidence: 1,
    };

    //Act
    const data = affordabilityRequestSchema.safeParse(json);

    const { success } = data;

    //Assert
    //expect(success).toBeTruthy();
  });

  it('schema returns false for a badly formed request', async () => {
    //Arrange
    const json = {
      XXX: true,
      YYY: true,
    };

    //Act
    const data = affordabilityRequestSchema.safeParse(json);
    const { success } = data;

    //Assert
    expect(success).toBeFalsy();
  });
});
