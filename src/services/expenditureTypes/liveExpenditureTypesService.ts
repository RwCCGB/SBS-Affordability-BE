import type { ExpenditureTypeService, ExpenditureType } from "./expenditureTypesService";

export class LiveExpenditureTypeService implements ExpenditureTypeService {
    async getAll(): Promise<ExpenditureType[]>{
        
        return [{
            "id": 2,
            "Text" : "Nursery/Child Care Costs",
            "SubText": "Total child care costs including child care vouchers",
            "Type": "M"
        }]
    }
}