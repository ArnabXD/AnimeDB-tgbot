import { Composer } from 'telegraf';

const bot = new Composer();

bot.help((ctx) => {
    ctx.replyWithVideo('https://telegra.ph/file/0daa0c8ea1c703c6785ef.mp4');
});

export default bot;