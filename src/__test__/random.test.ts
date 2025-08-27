import { describe } from "node:test";
import { randomiseResponse } from "../utils/randomiseResponse";

describe("RandomiseResponse Test Suite", () =>{
    it("Randomise: Always returns a value", ()=>{
        const result = randomiseResponse();
        expect(typeof result).toBe("string");
    })
    it("Randomise: To get success, declined or referred", ()=>{
        const seenValues = new Set<string>()
        for(let i = 0; i < 1000; i++){  
            seenValues.add(randomiseResponse());
        }
        expect(seenValues.has("Success")).toBe(true)
        expect(seenValues.has("Declined")).toBe(true)
        expect(seenValues.has("Referred")).toBe(true)
    })
})