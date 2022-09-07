import { Bot } from "grammy";
import Middleware, { error } from "./middleware/mod.ts";
import Commands from "./commands/mod.ts";
import Handlers from "./handlers/mod.ts";
import env from "../env.ts";

const bot = new Bot(env.BOT_TOKEN);

bot.use(Middleware, Commands, Handlers);
bot.catch(error);

export default bot;
