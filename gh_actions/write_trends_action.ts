import { createTrend } from "../services/mod.ts";
import { ICreateTrend } from "../interfaces/mod.ts";
import { getDatabase } from "../db/mod.ts";

const rawJson = Deno.args[0];
const recordsToBeInserted: ICreateTrend[] = JSON.parse(rawJson);

const db = getDatabase();

recordsToBeInserted.map((record) => createTrend(record, db));
