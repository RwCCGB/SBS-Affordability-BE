import type { RegionService, Region } from "./regionService";

export class LiveRegionService implements RegionService {
    async getAll(): Promise<Region[]>{
        
        return [{id: 1, name: "Yorkshire & Humberside"}]
    }
}