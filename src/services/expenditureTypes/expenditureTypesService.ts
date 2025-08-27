export type ExpenditureType = { id: number; Text: string, SubText: string, Type: string };
export interface ExpenditureTypeService { getAll(): Promise<ExpenditureType[]>;}