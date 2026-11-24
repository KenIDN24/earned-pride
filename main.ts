// One Line of Earned Pride — make.fun entry.
// Writes a single line (1-240 characters) to /output/entry.txt:
// a quiet, earned moment of pride for someone in a scene.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "At 4 a.m. he tightened the final bolt on the engine he'd rebuilt alone, and for the first time in months, it started.";
// Gate: UTF-8 text, 1-240 characters, not only whitespace, one line.
const chars = [...ENTRY];
if (chars.length < 1 || chars.length > 240) {
  throw new Error(`entry must be 1-240 characters, got ${chars.length}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");

// Round-trip check: what was written is byte-for-byte the entry.
const written = readFileSync(join(outDir, "entry.txt"), "utf8");
if (written !== ENTRY) {
  throw new Error("round-trip check failed: entry.txt differs from ENTRY");
}
console.log(`wrote ${chars.length} characters to ${join(outDir, "entry.txt")}`);
