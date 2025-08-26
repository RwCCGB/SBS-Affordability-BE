export type Region = { id: number; name: string };
export interface RegionService { getAll(): Promise<Region[]>;}