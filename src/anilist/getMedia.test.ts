import { assertSnapshot } from "testing/snapshot.ts";
import getMedia from "./getMedia.ts";

Deno.test("fetch anime information", async (t) => {
  assertSnapshot(t, await getMedia(20));
});

Deno.test("fetch manga information", async (t) => {
  assertSnapshot(t, await getMedia(102988, "MANGA"));
});
