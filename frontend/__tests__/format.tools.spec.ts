import { formatDate, removeAccents } from "@/lib/tools/format.tools";

describe("removeAccents Fn", () => {
  it("should remove accents", () => {
    expect(removeAccents("évènement")).toBe("evenement");
    expect(removeAccents("maïs")).toBe("mais");
    expect(removeAccents("évêque")).toBe("eveque");
  });
});

describe("formatDate Fn", () => {
  it("should format date", () => {
    expect(formatDate(new Date("2021-01-01T00:00:00.000Z"))).toBe("01/01/2021");
    expect(formatDate(new Date("2018-09-23T00:00:00.000Z"))).toBe("23/09/2018");
    expect(formatDate(new Date(1610000000000))).toBe("07/01/2021");
  });
});

