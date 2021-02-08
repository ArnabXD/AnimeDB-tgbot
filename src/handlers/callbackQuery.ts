import { Composer, Markup } from 'telegraf';
import getMedia from '../anilist/getMedia';
import { parseMedia } from '../utils';
const bot = new Composer();

bot.on('callback_query', async (ctx) => {
    if (!('data' in ctx.callbackQuery)) return;
    let data: { user: number, id?: number, type?: 'ANIME' | 'MANGA', action?: string } = JSON.parse(ctx.callbackQuery.data);
    let { user, id, type, action } = data;

    if (ctx.from?.id !== user) return ctx.answerCbQuery('Stay Away Please or Send Your own Query', { show_alert: true })

    if (action) {
        switch (action) {
            case 'delete':
                return ctx.deleteMessage();
            case 'media':
                let result = await getMedia(Number(id), type);
                if (!result) {
                    await ctx.deleteMessage();
                    return ctx.reply('Sometihng Went Wrong');
                }
                let message = parseMedia(result, type);
                let { trailer } = result.data.Media
                try {
                    return await ctx.editMessageMedia({
                        type: 'photo',
                        media: `https://img.anili.st/media/${id}`,
                        caption: message,
                        parse_mode: 'HTML',
                    },
                        Markup.inlineKeyboard([
                            [
                                Markup.button.url('AniList', `https://anilist.co/${type?.toLowerCase()}/${id}`),
                                Markup.button.url('MyAnimeList', `https://myanimelist.net/${type?.toLowerCase()}/${result.data.Media.idMal}`)
                            ],
                            ...(trailer && trailer.site === "youtube" ? [[Markup.button.url('Watch Trailer', `https://youtu.be/${trailer.id}`)]] : [])
                        ])
                    );
                } catch (err) {
                    console.log(err);
                    return ctx.answerCbQuery('Something Went Wrong , Please Report this to @Arnab431', { show_alert: true })
                }
            default:
                return ctx.answerCbQuery('Unhandled Action');
        }
    }
})

export default bot;