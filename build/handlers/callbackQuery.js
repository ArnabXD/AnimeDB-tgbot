"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const getMedia_1 = __importDefault(require("../anilist/getMedia"));
const utils_1 = require("../utils");
const bot = new telegraf_1.Composer();
bot.on('callback_query', async (ctx) => {
    var _a;
    if (!('data' in ctx.callbackQuery))
        return;
    let data = JSON.parse(ctx.callbackQuery.data);
    let { user, id, type, action } = data;
    if (((_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id) !== user)
        return ctx.answerCbQuery('Stay Away Please or Send Your own Query', { show_alert: true });
    if (action) {
        switch (action) {
            case 'delete':
                return ctx.deleteMessage();
            case 'media':
                let result = await getMedia_1.default(Number(id), type);
                if (!result) {
                    await ctx.deleteMessage();
                    return ctx.reply('Sometihng Went Wrong');
                }
                let message = utils_1.parseMedia(result, type);
                let { trailer } = result.data.Media;
                return await ctx.editMessageMedia({
                    type: 'photo',
                    media: `https://img.anili.st/media/${id}`,
                    caption: message,
                    parse_mode: 'HTML',
                }, telegraf_1.Markup.inlineKeyboard([
                    [
                        telegraf_1.Markup.button.url('AniList', `https://anilist.co/${type === null || type === void 0 ? void 0 : type.toLowerCase()}/${id}`),
                        telegraf_1.Markup.button.url('MyAnimeList', `https://myanimelist.net/${type === null || type === void 0 ? void 0 : type.toLowerCase()}/${result.data.Media.idMal}`)
                    ],
                    ...(trailer && trailer.site === "youtube" ? [[telegraf_1.Markup.button.url('Watch Trailer', `https://youtu.be/${trailer.id}`)]] : [])
                ]));
            default:
                return ctx.answerCbQuery('Unhandled Action');
        }
    }
});
exports.default = bot;
