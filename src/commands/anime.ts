import { Composer, InlineKeyboard } from 'grammy';
import { search } from '../anilist';

const composer = new Composer();

composer.command('anime', async (ctx) => {
  if (!ctx.match) {
    return ctx.reply(
      'Provide Search Keyword alongside command.\ne.g : `/anime Naruto`',
      { parse_mode: 'MarkdownV2' }
    );
  }

  const resp = await search(ctx.match);
  if (!resp) {
    return ctx.reply('No Results Found');
  }

  const results = resp.Page.media
    .map(({ title }, index) => `<b>${index + 1} :</b> <i>${title.romaji}</i>`)
    .join('\n');
  const { pageInfo } = resp.Page;

  const keyboard = new InlineKeyboard();
  for (let i = 0; i < resp.Page.media.length; i++) {
    const media = resp.Page.media[i];
    const resId =
      pageInfo.currentPage > 1
        ? pageInfo.perPage * (pageInfo.currentPage - 1)
        : i + 1;
    keyboard.text(
      resId.toString(),
      JSON.stringify({
        user: ctx.from?.id,
        type: 'ANIME',
        id: media.id,
        action: 'media'
      })
    );
    if (!((i + 1) % 5)) {
      keyboard.row();
    }
  }
  keyboard
    .row()
    .text('❌', JSON.stringify({ user: ctx.from?.id, action: 'delete' }));

  return await ctx.replyWithPhoto(
    'https://telegra.ph/file/489303b893fd3e70f1b1a.png',
    {
      reply_markup: keyboard,
      caption: `Search Results for <b>${ctx.match}</b>\n\n${results}`,
      parse_mode: 'HTML'
    }
  );
});

export default composer;
