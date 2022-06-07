import { Bot } from 'grammy';
import Middlewares from './middlewares';
import Commands from './commands';
import Handlers from './handlers';
import dotenv from 'dotenv';

dotenv.config();
const token = process.env.BOT_TOKEN;
if (!token) {
  throw new Error('BOT_TOKEN is not defined');
}

const bot = new Bot(token);

bot.use(Middlewares, Commands, Handlers);

export default bot;
