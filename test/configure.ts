import { config } from "chai";
config.includeStack = true;

export const mochaHooks = {
  beforeAll: () => process.stdout.write("\u001b[2J\u001b[3J\u001b[H"),
};
