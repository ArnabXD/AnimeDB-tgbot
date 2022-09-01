import { serve } from "server";
import { webhookCallback } from "grammy";
import bot from "./bot.ts";

const token = Deno.env.get("BOT_TOKEN");
if (!token) {
  throw new Error("BOT_TOKEN is not defined");
}

serve(webhookCallback(bot, "std/http"));
