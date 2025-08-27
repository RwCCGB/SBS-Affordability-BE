import type { IncomeTypeService, IncomeType } from "./incomeTypesService";

export class LiveIncomeTypeService implements IncomeTypeService {
    async getAll(): Promise<IncomeType[]>{
        
        return [{
            "id": 1,
            "Text" : "Maintenance/Child Support",
            "SubText": "",
            "Type": "M"
        }]
    }
}