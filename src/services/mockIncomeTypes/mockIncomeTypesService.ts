import type { IncomeTypeService, IncomeType } from "../incometypes/incomeTypesService";
import {loadMock} from "../../utils/fileReader";

export class MockIncomeTypeService implements IncomeTypeService{
    async getAll(): Promise<IncomeType[]> {
        return loadMock<IncomeType[]>("getIncomeTypes");
    }
}
