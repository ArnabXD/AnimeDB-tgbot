import { Bot } from "grammy";
import Middleware from "./middleware/mod.ts";
import Commands from "./commands/mod.ts";
import Handlers from "./handlers/mod.ts";

const token = Deno.env.get("BOT_TOKEN");
if (!token) {
  throw new Error("BOT_TOKEN is not defined");
}

const bot = new Bot(token);

bot.use(Middleware, Commands, Handlers);

export default bot;
