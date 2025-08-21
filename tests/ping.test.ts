//#region "Framework Setup Check"
describe("Framework Setup Check", () =>{
    it("Run a basic test to check that Jest is running", () =>{
        expect(1+1).toBe(2)
    })
})
//#endregion

//#region Ping Tests
import type { Request, Response, NextFunction } from "express"

jest.mock("../src/schemas/schemas", () => {
  const safeParse = jest.fn()
  return {
    __esModule: true,
    pingRequestSchema: { safeParse },
    _safeParseMock: safeParse,
  }
})

const { _safeParseMock: safeParseMock } = require("../src/schemas/schemas")
const { ping } = require("../src/controllers/pingController")

function mockReq(body: unknown = {}): Request { return { body } as Request; }
function mockRes() {
  const json = jest.fn()
  return { res: { json } as unknown as Response, json }
}
function mockNext() {
    return jest.fn() as NextFunction
}

describe("Ping Controller", () => {
  beforeEach(() => jest.clearAllMocks())

  it("Responds with JSON when validation succeeds", async () => {
    safeParseMock.mockReturnValueOnce({ success: true, data: {} })

    const req = mockReq({})
    const { res, json } = mockRes()
    const next = mockNext()

    await ping(req, res, next)

    expect(json).toHaveBeenCalledTimes(1)
    const payload = json.mock.calls[0][0]
    expect(payload.backendIsOnline).toBe(true)
    expect(payload.databaseIsonline).toBe(true)
    expect(next).not.toHaveBeenCalled()
  })

  it("Returns 404 when validation fails", async () => {
    safeParseMock.mockReturnValueOnce({
      success: false,
      error: { issues: [{ path: ["x"], message: "bad" }] },
    })
  
    const req = mockReq({})
    const { res } = mockRes()
    const next = mockNext()
  
    await expect(ping(req, res, next)).rejects.toEqual(
      expect.objectContaining({
        status: 400,
        msg: expect.stringMatching(/validation/i),
      })
    )
    expect(next).not.toHaveBeenCalled();
  })
})

