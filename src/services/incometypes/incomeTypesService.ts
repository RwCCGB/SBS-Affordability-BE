export type IncomeType = { id: number; Text: string, SubText: string, Type: string };
export interface IncomeTypeService { getAll(): Promise<IncomeType[]>;}