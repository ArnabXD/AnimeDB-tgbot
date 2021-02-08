"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const anilist_1 = require("../anilist");
const utils_1 = require("../utils");
exports.default = new telegraf_1.Composer().on('inline_query', async (ctx) => {
    const { query } = ctx.inlineQuery;
    if (query.startsWith('<m> ')) {
        let args = query.substring(4);
        const result = await anilist_1.getInlineResults(args, 'MANGA');
        if (!result || result.data.Page.pageInfo.total === 0)
            return;
        let mangas = result.data.Page.media.map((item) => ({
            type: 'article',
            id: item.id,
            title: item.title.romaji,
            description: "✪ " + item.averageScore / 10,
            thumb_url: item.coverImage.medium,
            input_message_content: {
                message_text: utils_1.parseMedia({ data: { Media: item } }),
                parse_mode: "HTML"
            },
            ...telegraf_1.Markup.inlineKeyboard([
                [
                    telegraf_1.Markup.button.url('AniList', `https://anilist.co/manga/${item.id}`),
                    ...(item.idMal ? [telegraf_1.Markup.button.url('MyAnimeList', `https://myanimelist.net/anime/${item.idMal}`)] : [])
                ],
                ...(item.trailer && item.trailer.site === "youtube" ? [[telegraf_1.Markup.button.url('Watch Trailer', `https://youtu.be/${item.trailer.id}`)]] : [])
            ])
        })); // @ts-ignore
        return ctx.answerInlineQuery(mangas);
    }
    else {
        let args = query.startsWith('<a> ') ? query.substring(4) : query;
        const result = await anilist_1.getInlineResults(args, 'ANIME');
        if (!result || result.data.Page.pageInfo.total === 0)
            return;
        let animes = result.data.Page.media.map((item) => ({
            type: 'article',
            id: item.id,
            title: item.title.romaji,
            description: "✪ " + item.averageScore / 10,
            thumb_url: item.coverImage.medium,
            input_message_content: {
                message_text: utils_1.parseMedia({ data: { Media: item } }),
                parse_mode: "HTML"
            },
            ...telegraf_1.Markup.inlineKeyboard([
                [
                    telegraf_1.Markup.button.url('AniList', `https://anilist.co/anime/${item.id}`),
                    ...(item.idMal ? [telegraf_1.Markup.button.url('MyAnimeList', `https://myanimelist.net/anime/${item.idMal}`)] : [])
                ],
                ...(item.trailer && item.trailer.site === "youtube" ? [[telegraf_1.Markup.button.url('Watch Trailer', `https://youtu.be/${item.trailer.id}`)]] : [])
            ])
        })); // @ts-ignore
        return ctx.answerInlineQuery(animes);
    }
});
