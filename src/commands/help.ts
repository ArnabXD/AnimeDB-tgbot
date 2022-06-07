import { Composer } from 'grammy';

const composer = new Composer();

composer.command('help', async (ctx) => {
  const helpMsg = [
    `<b>Available Commands : </b>`,
    `/start : Start the Bot`,
    `/help : Show Help Menu.`,
    `/anime : Search Anime`,
    `/manga : Search Manga.`
  ].join('\n');
  return await ctx.reply(helpMsg, { parse_mode: 'HTML' });
});

export default composer;
