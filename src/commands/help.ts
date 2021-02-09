import { Composer, Markup } from 'telegraf';

const bot = new Composer();

bot.help(async (ctx) => {
    let helpMsg = [
        `<b>Available Commands : </b>`,
        `/start : Start the Bot`,
        `/help : Show Help Menu.`,
        `/anime : Search Anime`,
        `/manga : Search Manga.`
    ].join('\n')
    return await ctx.replyWithHTML(helpMsg)
});

export default bot;