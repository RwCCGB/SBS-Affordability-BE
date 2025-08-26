import { loadMock } from "../utils/fileReader";

describe("Testing utils functions", ()=>{
    it("GetRegion: Read fileReader JSON mock data", async ()=>{
        const data = await loadMock<{region: string, id: Number}>("getRegion");
        expect(data).toMatchObject({
            region: expect.any(String),
            id: expect.any(Number),
        })
    })

    it("GetRegion: Read fileReader JSON mock data and validate correct", async ()=>{
        const data = await loadMock<{region: string, id: Number}>("getRegion");

        expect(data.region).toBe("Yorkshire & Humberside");
        expect(data.id).toBe(1);
    })
})