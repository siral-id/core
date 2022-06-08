import { Source } from "../enum.ts";

export interface ICreateTrend {
  keyword: string;
  image: string;
  count: number;
  source: Source;
}
