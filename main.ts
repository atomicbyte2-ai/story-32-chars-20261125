import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one Wi-Fi network name, exactly 32 characters.
// A breakup told as a divorce settlement: he got the dog, the
// narrator got the Wi-Fi — and is clearly fine with the trade.
const LINE = "He took the dog, I kept the WiFi";

// Validate: 1-32 chars, single line, no control characters,
// and not only whitespace. The gate requires 1-32 UTF-8 chars.
const chars = [...LINE].length;
if (chars < 1 || chars > 32) {
  throw new Error(`Line must be 1-32 characters, got ${chars}`);
}
if (LINE !== LINE.trim() || /\s/.test(LINE) === false) {
  // keep the line exactly as written; trim check guards stray spaces
}
if (/[\r\n]/.test(LINE) || /[\u0000-\u001F\u007F]/.test(LINE)) {
  throw new Error("Line must be a single line with no control characters");
}
if (LINE.trim().length === 0) {
  throw new Error("Line must not be only whitespace");
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), LINE, "utf8");
console.log(`Wrote entry.txt (${chars} characters): ${LINE}`);
