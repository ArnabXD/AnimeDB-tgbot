import express from 'express';
import { Bot, webhookCallback } from 'grammy';
import Middlewares from './middlewares';
import Commands from './commands';
import Handlers from './handlers';
import dotenv from 'dotenv';

dotenv.config();
const token = process.env.BOT_TOKEN;
if (!token) {
  throw new Error('BOT_TOKEN is not defined');
}

const app = express();
const bot = new Bot(token);

bot.use(Middlewares, Commands, Handlers);
app.get(`/${token}`, async (req, res) => {
  const fullUrl = `https://${req.get('host')}${req.originalUrl}`;
  await bot.api.setWebhook(fullUrl);
  return res.json({ success: true });
});
app.post(`/${token}`, express.json(), webhookCallback(bot, 'express'));

app.listen(process.env.PORT || 3000);
