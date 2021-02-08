"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const bot = new telegraf_1.Composer();
bot.help((ctx) => {
    ctx.replyWithVideo('https://telegra.ph/file/0daa0c8ea1c703c6785ef.mp4');
});
exports.default = bot;
