import { Composer } from 'grammy';

const composer = new Composer();

composer.command('id', async (ctx) => {
  if (ctx.message?.reply_to_message?.from?.id) {
    const { id, first_name } = ctx.message.reply_to_message.from;
    return ctx.reply(`<b>${first_name}'s ID : </b><i>${id}</i>`, {
      parse_mode: 'HTML'
    });
  }
  return await ctx.reply(
    `<b>User ID :</b> <i>${ctx.from?.id}</i>\n` +
      (ctx.message?.chat.type !== 'private'
        ? `<b>Chat ID :</b> <i>${ctx.message?.chat.id}</i>`
        : ''),
    { parse_mode: 'HTML' }
  );
});

export default composer;
