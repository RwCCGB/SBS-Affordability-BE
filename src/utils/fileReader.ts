import { readFile } from "node:fs/promises";
import {join} from "node:path";

export async function loadMock<T = unknown>(name: string, baseDir = "src/mocks" ) : Promise<T>{
    const file = join(process.cwd(), baseDir, `${name}.json`);
    const fileRead = await readFile(file, "utf-8");
    const data = JSON.parse(fileRead) as T;
    return data;
}

