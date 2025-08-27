import { string } from "zod";
import { loadMock } from "../utils/fileReader";
import { stringFormat } from "zod/mini";
import { calculateLtv } from "../utils/calculateLtv";
import { describe } from "node:test";

describe("CalculateLTV Test Suit",()=>{
    it("CalculateLTV: Calculate correct LTV", ()=>{
        expect(calculateLtv(75000, 100000)).toBe(75);
    })
    it("CalculateLTV: Calculate correct LTV rounded to 2 decimal places", ()=>{
        expect(calculateLtv(33333, 100000)).toBe(33.33);
    })
    it("CalculateLTV: Throw an error if loanAmount or propertyValue is <= 0", ()=>{
        expect(() => calculateLtv(0, 100000)).toThrow("Loan amount must be greater than zero");
        expect(() => calculateLtv(75000, 0)).toThrow("Property value must be greater than zero");
    })
    it("CalculateLTV: Throw an error if loanAmount > propertyValue", ()=>{
        expect(() => calculateLtv(100000, 200)).toThrow("Loan value cannot exceed property value");
    })
})

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