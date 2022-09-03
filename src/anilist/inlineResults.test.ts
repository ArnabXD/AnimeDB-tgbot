import { assertSnapshot } from "testing/snapshot.ts";
import getInlineResults from "./inlineResults.ts";

Deno.test("inline result (anime)", async (snap) => {
  const result = await getInlineResults("boku no pico");
  assertSnapshot(snap, result);
});

Deno.test("inline result (manga)", async (snap) => {
  const result = await getInlineResults("Tokyo Revengers", "MANGA");
  assertSnapshot(snap, result);
});
