import { Composer, Markup } from 'telegraf';
import { getInlineResults } from '../anilist';
import { parseMedia } from '../utils';

export default new Composer().on('inline_query', async ctx => {
    const { query } = ctx.inlineQuery;

    if (query.startsWith('<m> ')) {
        let args = query.substring(4)
        const result = await getInlineResults(args, 'MANGA');
        if (!result || result.data.Page.pageInfo.total === 0) return

        let mangas = result.data.Page.media.map((item) => ({
            type: 'article',
            id: item.id,
            title: item.title.romaji,
            description: "✪ " + item.averageScore / 10,
            thumb_url: item.coverImage.medium,
            input_message_content: {
                message_text: parseMedia({ data: { Media: item } }),
                parse_mode: "HTML"
            },
            ...Markup.inlineKeyboard([
                [
                    Markup.button.url('AniList', `https://anilist.co/manga/${item.id}`),
                    ...(item.idMal ? [Markup.button.url('MyAnimeList', `https://myanimelist.net/anime/${item.idMal}`)] : [])
                ],
                ...(item.trailer && item.trailer.site === "youtube" ? [[Markup.button.url('Watch Trailer', `https://youtu.be/${item.trailer.id}`)]] : [])
            ])
        })) // @ts-ignore
        return ctx.answerInlineQuery(mangas)
    } else {
        let args = query.startsWith('<a> ') ? query.substring(4) : query
        const result = await getInlineResults(args, 'ANIME');
        if (!result || result.data.Page.pageInfo.total === 0) return

        let animes = result.data.Page.media.map((item) => ({
            type: 'article',
            id: item.id,
            title: item.title.romaji,
            description: "✪ " + item.averageScore / 10,
            thumb_url: item.coverImage.medium,
            input_message_content: {
                message_text: parseMedia({ data: { Media: item } }),
                parse_mode: "HTML"
            },
            ...Markup.inlineKeyboard([
                [
                    Markup.button.url('AniList', `https://anilist.co/anime/${item.id}`),
                    ...(item.idMal ? [Markup.button.url('MyAnimeList', `https://myanimelist.net/anime/${item.idMal}`)] : [])
                ],
                ...(item.trailer && item.trailer.site === "youtube" ? [[Markup.button.url('Watch Trailer', `https://youtu.be/${item.trailer.id}`)]] : [])
            ])
        })) // @ts-ignore
        return ctx.answerInlineQuery(animes)
    }
})