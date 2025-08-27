import { string } from "zod";
import { loadMock } from "../utils/fileReader";

describe("Testing utils functions", ()=>{
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