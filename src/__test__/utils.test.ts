import { string } from "zod";
import { loadMock } from "../utils/fileReader";
import { stringFormat } from "zod/mini";

describe("GetRegion Test Suit", ()=>{
    it("GetRegion: Read fileReader JSON mock data", async ()=>{
        const data = await loadMock<{name: string, id: Number}>("getRegion");
        expect(Array.isArray(data)).toBe(true);
        expect(data).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                })
            ])
        )
    })

    it("GetRegion: Read fileReader JSON mock data and validate correct", async ()=>{
        const data = await loadMock<Region[]>("getRegion");
        expect(data).toEqual(
            expect.arrayContaining([
                expect.objectContaining({id: 1, name: "Yorkshire & Humberside"})
            ])
        )
    })
})

describe("GetIncomeTypes Test Suit", ()=>{
    it("GetIncomeTypes: Read fileReader JSON mock data", async ()=>{
        const data = await loadMock<{name: string, id: Number}>("getIncomeTypes");
        expect(Array.isArray(data)).toBe(true);
        expect(data).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                })
            ])
        )
    })

    it("GetIncomeTypes: Read fileReader JSON mock data and validate correct", async ()=>{
        const data = await loadMock<IncomeType[]>("getIncomeTypes");
        expect(data).toEqual(
            expect.arrayContaining([
                expect.objectContaining({id: 1, name: "Guaranteed Other (Before Deductions)"})
            ])
        )
    })
})

describe("GetExpenditureTypes Test Suit", ()=>{
    it("GetExpenditureTypes: Read fileReader JSON mock data", async ()=>{
        const data = await loadMock<{Text: string, SubText: string, Type: string, id: Number}>("getExpenditureTypes");
        expect(Array.isArray(data)).toBe(true);
        expect(data).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    Text: expect.any(String),
                    SubText: expect.any(String),
                    Type: expect.any(String)
                })
            ])
        )
    })

    it("GetExpenditureTypes: Read fileReader JSON mock data and validate correct", async ()=>{
        const data = await loadMock<ExpenditureType[]>("getExpenditureTypes");
        expect(data).toEqual(
            expect.arrayContaining([
                expect.objectContaining({id: 2, Text: "Nursery/Child Care Costs", SubText: "Total child care costs including child care vouchers", Type: "M"})
            ])
        )
    })
})