import bot from './bot';

bot.start({
  drop_pending_updates: true,
  allowed_updates: ['callback_query', 'inline_query', 'message']
});

process.once('SIGINT', () => bot.stop());
process.once('SIGTERM', () => bot.stop());
