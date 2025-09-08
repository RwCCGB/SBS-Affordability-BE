import type { Request, Response, NextFunction } from 'express';

jest.mock('../schemas/affordability/affordabilityRequestSchema.ts', () => {
  const safeParse = jest.fn();
  return {
    __esModule: true,
    affordabilityRequestSchema: { safeParse },
    _safeParseMock: safeParse,
  };
});

const {
  _safeParseMock: safeParseMock,
} = require('../schemas/affordability/affordabilityRequestSchema.ts');
const {
  assessAffordability,
} = require('../controllers/affordabilityController.ts');

function mockReq(body: unknown = {}): Request {
  return { body } as Request;
}
function mockRes() {
  const json = jest.fn();
  return { res: { json } as unknown as Response, json };
}
function mockNext() {
  return jest.fn() as NextFunction;
}

describe('affordability controller', () => {
  beforeEach(() => jest.clearAllMocks());

  it('responds with JSON when validation succeeds', async () => {
    safeParseMock.mockReturnValueOnce({ success: true, data: {} });
    const req = mockReq({
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
    });
    const { res, json } = mockRes();
    const next = mockNext();

    await assessAffordability(req, res, next);

    expect(json).toHaveBeenCalledTimes(1);
    const payload = json.mock.calls[0][0];

    const now = new Date();
    expect(payload.maximumLoanAllowed).toEqual(100000);
  });

  it('rejects with {status, msg} when validation fails', async () => {
    safeParseMock.mockReturnValueOnce({
      success: false,
      error: { issues: [{ path: ['field'], message: 'Required' }] },
    });

    const req = mockReq({});
    const { res } = mockRes();
    const next = mockNext();

    await expect(assessAffordability(req, res, next)).rejects.toEqual(
      expect.objectContaining({
        status: 400,
        msg: expect.stringMatching(/Affordability request schema validation failure/i),
      }),
    );
    expect(next).not.toHaveBeenCalled();
  });
});
