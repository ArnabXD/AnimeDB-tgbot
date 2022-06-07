import { Composer, InlineKeyboard } from 'grammy';

const composer = new Composer();

composer.command('start', (ctx) => {
  const keyboard = new InlineKeyboard();
  ctx.reply(
    "<b>Hi There . Have a Great Day\nReport Bug/Errors/Suggesions : <a href='tg://user?id=611816596'>Λгɳαɓ</a></b>",
    {
      parse_mode: 'HTML',
      reply_markup: keyboard
        .url('Bot Updates & News', 'https://t.me/xdbots')
        .row()
        .url('Help & More', 'https://telegra.ph/AnimeDB-Bot--HELP-08-03')
        .url('Rate Me', 'https://t.me/tlgrmcbot?start=animedb_bot-review')
        .row()
        .switchInlineCurrent('Search Anime', '')
        .switchInlineCurrent('Search Manga', '<m> ')
    }
  );
});

export default composer;
