import { cryptoHash } from "../tools/hash.tools";

describe("test cryptoHash", () => {
  it("hash some string", () => {
    expect(cryptoHash("test").length).toBeGreaterThan(0);
    expect(typeof cryptoHash("test")).toBe("string");
  });
});
