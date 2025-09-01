import type { RegionService, Region } from "../regions/regionService";
import {loadMock} from "../../utils/fileReader";

export class MockRegionService implements RegionService{
    async getAll(): Promise<Region[]> {
        return loadMock<Region[]>("getRegion");
    }
}
