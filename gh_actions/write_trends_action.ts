import { createTrend } from "../services/mod.ts";
import { ICreateTrend } from "../interfaces/mod.ts";
import { db } from "../db/mod.ts";

const rawJson = Deno.args[0];
const recordsToBeInserted: ICreateTrend[] = JSON.parse(rawJson);

recordsToBeInserted.map((record) => createTrend(record, db));
