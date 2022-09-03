import { assertSnapshot } from "testing/snapshot.ts";
import search from "./search.ts";

Deno.test("search anime", async (snap) => {
  const result = await search("Boku no Pico", "ANIME");
  assertSnapshot(snap, result);
});

Deno.test("search manga", async (snap) => {
  const result = await search("Tokyo Revengers", "MANGA");
  assertSnapshot(snap, result);
});
