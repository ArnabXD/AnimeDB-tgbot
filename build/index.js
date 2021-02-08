"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const telegraf_1 = require("telegraf");
const middlewares_1 = __importDefault(require("./middlewares"));
const commands_1 = __importDefault(require("./commands"));
const handlers_1 = __importDefault(require("./handlers"));
dotenv_1.default.config();
const token = process.env.BOT_TOKEN;
if (token === undefined) {
    throw new Error('BOT_TOKEN must be provided!');
}
const bot = new telegraf_1.Telegraf(token, { telegram: { webhookReply: false } });
bot.use(middlewares_1.default, commands_1.default, handlers_1.default);
const { BOT_DOMAIN, PORT } = process.env;
if (BOT_DOMAIN && Number(PORT)) {
    console.log(`Bot Started with Webhook ${BOT_DOMAIN}:${PORT}`);
    bot.launch({
        webhook: {
            domain: BOT_DOMAIN,
            port: Number(PORT)
        }
    });
}
else {
    console.log('BOT_DOMAIN & PORT Variables not Found . Starting with Polling...');
    bot.launch();
}
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
