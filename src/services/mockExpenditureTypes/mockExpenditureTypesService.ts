import type { ExpenditureTypeService, IncomeType } from "../expendituretTypes/expendituretTypesService";
import {loadMock} from "../../utils/fileReader";

export class MockExpenditureTypeService implements ExpenditureTypeService{
    async getAll(): Promise<ExpenditureType[]> {
        return loadMock<ExpenditureType[]>("getExpenditureTypes");
    }
}
