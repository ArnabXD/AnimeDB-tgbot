"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const anilist_1 = require("../anilist");
const bot = new telegraf_1.Composer();
bot.command('anime', async (ctx) => {
    var _a;
    let { args, bot } = ctx.state.command;
    if (!args)
        return ctx.reply(`Provide Search Keyword alongside command.\ne.g : /anime${(ctx.message.chat.type !== 'private') ? '@' + bot : ''} Naruto`);
    let resp = await anilist_1.Search(args);
    if (!resp)
        return ctx.reply('No Results Found');
    let results = resp.data.Page.media.map(({ title }, index) => `<b>${index + 1} :</b> <i>${title.romaji}</i>`).join('\n');
    let { pageInfo } = resp.data.Page;
    let buttons = resp.data.Page.media.map((x, i) => {
        var _a;
        let resId = (pageInfo.currentPage > 1) ? pageInfo.perPage * (pageInfo.currentPage - 1) : i + 1;
        return telegraf_1.Markup.button.callback(resId.toString(), JSON.stringify({
            user: (_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id,
            type: 'ANIME',
            id: x.id,
            action: 'media'
        }));
    });
    let { length } = buttons;
    let roundup = Math.ceil(length / 2);
    return await ctx.replyWithPhoto('https://telegra.ph/file/489303b893fd3e70f1b1a.png', {
        parse_mode: 'HTML',
        caption: `Search Results for <b>${args}</b>\n\n${results}`,
        ...telegraf_1.Markup.inlineKeyboard([
            ...(length > 5
                ? [buttons.slice(0, roundup)]
                : [buttons]),
            ...(length > 5
                ? [buttons.slice(roundup, length)]
                : []),
            [telegraf_1.Markup.button.callback('❌', JSON.stringify({ user: (_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id, action: 'delete' }))]
        ])
    });
});
exports.default = bot;
