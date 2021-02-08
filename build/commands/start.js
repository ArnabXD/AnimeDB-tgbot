"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const bot = new telegraf_1.Composer();
bot.start(ctx => {
    ctx.replyWithHTML("<b>Hi There . Have a Great Day\nReport Bug/Errors/Suggesions : <a href='tg://user?id=611816596'>Λгɳαɓ</a></b>", {
        ...telegraf_1.Markup.inlineKeyboard([
            [telegraf_1.Markup.button.url('Bot Updates & News', 'https://t.me/xdbots')],
            [
                telegraf_1.Markup.button.url('Help & More', process.env.HELP_LINK || 'https://telegra.ph/AnimeDB-Bot--HELP-08-03'),
                telegraf_1.Markup.button.url('Rate Me', 'https://t.me/tlgrmcbot?start=animedb_bot-review')
            ],
            [
                telegraf_1.Markup.button.switchToCurrentChat('Search Anime', ''),
                telegraf_1.Markup.button.switchToCurrentChat('Search Manga', '<m> ')
            ]
        ])
    });
});
exports.default = bot;
