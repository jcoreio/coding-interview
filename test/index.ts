import { describe, it } from "mocha";
import { expect } from "chai";
import { validate } from "../src/index.ts";

describe(`type: "string"`, function () {
  it(`only accepts strings`, function () {
    expect(validate("a", { type: "string" })).to.equal(true);
    expect(validate(2, { type: "string" })).to.equal(false);
    expect(validate(true, { type: "string" })).to.equal(false);
  });
});
