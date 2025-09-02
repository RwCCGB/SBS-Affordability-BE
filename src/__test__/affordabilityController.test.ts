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

    const req = mockReq({});
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
        msg: expect.stringMatching(/validation/i),
      }),
    );
    expect(next).not.toHaveBeenCalled();
  });
});
