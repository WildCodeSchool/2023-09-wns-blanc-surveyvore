import { createHash } from "crypto";

export function cryptoHash(stringToHash: string): string {
  return createHash("sha256").update(stringToHash).digest("hex");
}
