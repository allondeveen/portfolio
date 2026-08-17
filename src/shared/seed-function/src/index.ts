import type { Payload } from "payload";

export type SeedFunction<Data> = {
  (payload: Payload): Promise<Data[]> | Data[];
};
