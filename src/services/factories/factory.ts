import { MockRegionService } from "../mockRegions/mockRegionService";
import { LiveRegionService } from "../regions/liveRegionService";
import type { RegionService } from "../regions/regionService";

const useMocks = process.env.IS_DEV === "1" || process.env.NODE_ENV === "dev";

let singleton: RegionService | null = null;

export function getRegionService(): RegionService {
    if(!singleton){
        singleton = useMocks ? new MockRegionService() : new LiveRegionService();
    }
    return singleton;
}