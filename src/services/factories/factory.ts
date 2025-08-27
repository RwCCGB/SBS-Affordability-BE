import config from "../../config/config";
import {loadMock} from "../../utils/fileReader"

import { LiveRegionService } from "../regions/liveRegionService";
import {Region} from "../../models/regions/region"

import { LiveIncomeTypeService } from "../incometypes/liveIncomeTypesService";
import { IncomeCategory } from "../../models/categories/incomeCategory";
import { IncomeType } from "../incometypes/incomeTypesService";

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

export function getIncomeTypes(){
    if(config.useMocks){
        return{
            async getAll() : Promise<IncomeType[]>{
                return loadMock<IncomeType[]>("getIncomeTypes")
            },
        };
    }
    return new LiveIncomeTypeService();
}