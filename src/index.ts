import dotenv from 'dotenv';
import { Telegraf } from 'telegraf';
import Middlewares, { CommandContext } from './middlewares';
import Commands from './commands';
import Handlers from './handlers';

dotenv.config();

const token = process.env.BOT_TOKEN;
if (token === undefined) {
    throw new Error('BOT_TOKEN must be provided!')
}

const bot = new Telegraf<CommandContext>(token, { telegram: { webhookReply: false } });

bot.use(
    Middlewares,
    Commands,
    Handlers
);

const { BOT_DOMAIN, PORT } = process.env
if (BOT_DOMAIN && Number(PORT)) {
    console.log(`Bot Started with Webhook ${BOT_DOMAIN}:${PORT}`);
    bot.launch({
        webhook: {
            domain: BOT_DOMAIN,
            port: Number(PORT)
        }
    });
} else {
    console.log('BOT_DOMAIN & PORT Variables not Found . Starting with Polling...');
    bot.launch();
}

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))