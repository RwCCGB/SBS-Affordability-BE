import { affordabilityRequestSchema } from '../../../schemas/affordability/affordabilityRequestSchema';

describe('affordabilityRequestSchema', () => {
  it('schema returns true for a correctly formed request', async () => {
    //Arrange
    const json = {
      interestOnlyAmount: 100000,
      interestRateOfProduct: 3,
      isNewBuild: false,
      isLongTermFixedProduct: true,
      myMortgageApplication: {
        allApplicants: [
          {
            allExpenditureItems: [
              {
                myApplicant: true,
                expenditureAmount: 1000.0,
                stcExpenditureType: 1,
              },
              {
                myApplicant: true,
                expenditureAmount: 2000.0,
                stcExpenditureType: 1,
              },
            ],
            allIncomeItems: [
              {
                myApplicant: true,
                annualAmount: 1000.0,
                stcIncomeType: 1,
              },
              {
                myApplicant: true,
                annualAmount: 2000.0,
                stcIncomeType: 1,
              },
            ],
            employmentStatus: 'E',
            firstTimeBuyer: 'Y',
            residentialStatus: 1,
          },
        ],
        applicationSource: 1,
        mortgageFees: 150,
        mySharedOwnershipDetails: true,
        purchasePrice: 100000,
        totalLoanAmount: 10000,
        useDefaultFeeValue: true,
      },
      numberOfDependents: 1,
      region: 'Yorkshire & Humberside',
      repaymentType: 'Interest Only',
      termMonths: 0,
      termYears: 25,
      willBeApplicantsMainResidence: true,
    };

    //Act
    const data = affordabilityRequestSchema.safeParse(json);

    const { success } = data;

    //Assert
    expect(success).toBeTruthy();
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
