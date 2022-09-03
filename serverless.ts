import { serve } from "server";
import { webhookCallback } from "grammy";
import bot from "./src/bot.ts";

serve(webhookCallback(bot, "std/http"));
