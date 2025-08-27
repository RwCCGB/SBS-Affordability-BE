import config from "../../config/config";
import {loadMock} from "../../utils/fileReader"

import { LiveRegionService } from "../regions/liveRegionService";
import {Region} from "../../models/regions/region"

export function getRegionService() {
    if(config.useMocks){
        return {
            async getAll() : Promise<Region[]> {
                return loadMock<Region[]>("getRegion")
            },
        };
    }
    return new LiveRegionService();
}