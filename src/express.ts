import express from 'express';
import { webhookCallback } from 'grammy';
import bot from './bot';

const app = express();

const token = process.env.BOT_TOKEN;
if (!token) {
  throw new Error('BOT_TOKEN is not defined');
}

app.get(`/${token}`, async (req, res) => {
  const fullUrl = `https://${req.get('host')}${req.originalUrl}`;
  await bot.api.setWebhook(fullUrl);
  return res.json({ success: true });
});
app.post(`/${token}`, express.json(), webhookCallback(bot, 'express'));

app.listen(process.env.PORT || 3000);
