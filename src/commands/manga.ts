import { Composer, Markup } from 'telegraf';
import { CommandContext } from '../middlewares';
import { Search } from '../anilist';

const bot = new Composer<CommandContext>();

bot.command('manga', async (ctx) => {
    let { args, bot } = ctx.state.command
    if (!args) return ctx.reply(`Provide Search Keyword alongside command.\ne.g : /manga${(ctx.message.chat.type !== 'private') ? '@' + bot : ''} Naruto`);

    let resp = await Search(args, 'MANGA');
    if (!resp) return ctx.reply('No Results Found');

    let results = resp.data.Page.media.map(({ title }, index) => `<b>${index + 1} :</b> <i>${title.romaji}</i>`).join('\n');
    let { pageInfo } = resp.data.Page
    let buttons = resp.data.Page.media.map((x, i) => {
        let resId = (pageInfo.currentPage > 1) ? pageInfo.perPage * (pageInfo.currentPage - 1) : i + 1
        return Markup.button.callback(
            resId.toString(),
            JSON.stringify({
                user: ctx.from?.id,
                type: 'MANGA',
                id: x.id,
                action: 'media'
            })
        )
    });

    let { length } = buttons;
    let roundup = Math.ceil(length / 2);

    return await ctx.replyWithPhoto('https://telegra.ph/file/489303b893fd3e70f1b1a.png', {
        parse_mode: 'HTML',
        caption: `Search Results for <b>${args}</b>\n\n${results}`,
        ...Markup.inlineKeyboard([
            ...(length > 5
                ? [buttons.slice(0, roundup)]
                : [buttons]
            ),
            ...(length > 5
                ? [buttons.slice(roundup, length)]
                : []
            ),
            [Markup.button.callback('❌', JSON.stringify({ user: ctx.from?.id, action: 'delete' }))]
        ])
    });
})

export default bot;