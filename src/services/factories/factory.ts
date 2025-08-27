import { LiveRegionService } from "../regions/liveRegionService";
import {Region} from "../../models/regions/region"
import config from "../../config/config";
import {loadMock} from "../../utils/fileReader"

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