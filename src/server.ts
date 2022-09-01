import bot from "./bot.ts";

bot.start({
  drop_pending_updates: true,
  allowed_updates: ["callback_query", "inline_query", "message"],
});

Deno.addSignalListener("SIGINT", () => bot.stop());
Deno.addSignalListener("SIGTERM", () => bot.stop());
