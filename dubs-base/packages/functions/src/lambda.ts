import { ApiHandler } from "sst/node/api";
import { Time } from "@dubs-base/core/time";

export const handler = ApiHandler(async (_evt) => {
  return {
    body: `Hello world. The time is ${Time.now()}`,
  };
});
