import { Composer, Markup } from 'telegraf';

const bot = new Composer();

bot.start(ctx => {
    ctx.replyWithHTML("<b>Hi There . Have a Great Day\nReport Bug/Errors/Suggesions : <a href='tg://user?id=611816596'>Λгɳαɓ</a></b>", {
        ...Markup.inlineKeyboard([
            [Markup.button.url('Bot Updates & News', 'https://t.me/xdbots')],
            [
                Markup.button.url('Help & More', process.env.HELP_LINK || 'https://telegra.ph/AnimeDB-Bot--HELP-08-03'),
                Markup.button.url('Rate Me', 'https://t.me/tlgrmcbot?start=animedb_bot-review')
            ],
            [
                Markup.button.switchToCurrentChat('Search Anime', ''),
                Markup.button.switchToCurrentChat('Search Manga', '<m> ')
            ]
        ])
    }
    )
})

export default bot;