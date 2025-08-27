import type { Request, Response, NextFunction } from "express";
import { describe } from "node:test";

jest.mock("../schemas/ping/pingRequestSchema.ts", () => {
  const safeParse = jest.fn();
  return {
    __esModule: true,
    pingRequestSchema: { safeParse },
    _safeParseMock: safeParse, 
  };
});

const { _safeParseMock: safeParseMock } = require("../schemas/ping/pingRequestSchema.ts");
const { ping } = require("../controllers/pingController.ts");

function mockReq(body: unknown = {}): Request 
{ 
    return { body } as Request; 
}
function mockRes() 
{ 
    const json = jest.fn(); 
    return { res: { json } as unknown as Response, json }; 
}
function mockNext() 
{ 
    return jest.fn() as NextFunction; 
}

describe("Ping Controller Test Suite", () => {
  beforeEach(() => jest.clearAllMocks());

  it("responds with JSON when validation succeeds", async () => {
    safeParseMock.mockReturnValueOnce({ success: true, data: {} });

    const req = mockReq({});
    const { res, json } = mockRes();
    const next = mockNext();

    await ping(req, res, next);

    expect(json).toHaveBeenCalledTimes(1);
    const payload = json.mock.calls[0][0];
    expect(payload.backendIsOnline).toBe(true);
    expect(payload.databaseIsonline).toBe(true);
    expect(payload.status).toBe("Active");

  });

  it("rejects with {status, msg} when validation fails", async () => {
    safeParseMock.mockReturnValueOnce({
      success: false,
      error: { issues: [{ path: ["field"], message: "Required" }] },
    });
  
    const req = mockReq({});
    const { res } = mockRes();
    const next = mockNext();
  
    await expect(ping(req, res, next)).rejects.toEqual(
      expect.objectContaining({
        status: 400,
        msg: expect.stringMatching(/validation/i),
      }),
    );
  
    expect(next).not.toHaveBeenCalled();
  });
});