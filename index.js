const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
var anime = require('./api')
require('dotenv').config()

const bot = new Telegraf(process.env.BOT_TOKEN, { username: process.env.BOT_USERNAME })

bot.start((ctx) => {
	ctx.webhookReply = false
	ctx.replyWithHTML("<b>Hi There . Have a Great Day\nReport Bug/Errors/Suggesions : <a href='tg://user?id=611816596'>Λгɳαɓ</a></b>",
		Extra.markup(
			Markup.inlineKeyboard([
				[Markup.urlButton('Bot Updates & News', 'https://t.me/xdbots')],
				[
					Markup.urlButton('Help & More', process.env.HELP_LINK || 'https://telegra.ph/AnimeDB-Bot--HELP-08-03'),
					Markup.urlButton('Rate Me', 'https://t.me/tlgrmcbot?start=animedb_bot-review')
				],
				[Markup.switchToCurrentChatButton('Search Anime', '', false)]
			])
		))
})

bot.help((ctx) => {
	ctx.webhookReply = false
	ctx.replyWithVideo('https://telegra.ph/file/0daa0c8ea1c703c6785ef.mp4');
});

bot.on('inline_query', (ctx) => {
	ctx.webhookReply = false;
	ctx.inlineQuery.query && ctx.inlineQuery.query.length > 2 ?
		anime.Search(ctx.inlineQuery.query)
			.then((results) => {
				console.log(`Searching for ${ctx.inlineQuery.query}`);
				let animes = results.map((item) => ({
					type: 'article',
					id: item.mal_id,
					title: item.title,
					description: "✪ " + item.score,
					thumb_url: item.image_url,
					input_message_content: {
						message_text: `<b>${item.title}</b>\n\n` +
							`<b>Type :</b> <code>${item.type}</code>\n` +
							`<b>Year :</b> <code>` + (typeof (item.start_date) === 'string' ? item.start_date.substr(0, 4) : item.start_date) + `</code>\n` +
							`<b>Age Rating :</b> <code>${item.rated}</code>\n` +
							`<b>Rating :</b> <code>${item.score}</code><a href="${item.image_url}">&#8205;</a>\n\n` +
							`<code>${item.synopsis}</code>.<a href="${item.url}">Read More</a>`,
						parse_mode: "HTML"
					},
					reply_markup: Markup.inlineKeyboard([
						[Markup.urlButton('View in MyAnimeList.net', item.url)]
					])
				}))
				return ctx.answerInlineQuery(animes)
			})
			.catch((error) => {
				let animes = []
				console.log(error)
				return ctx.answerInlineQuery(animes)
			})
		:
		null;
})

bot.on('chosen_inline_result', async (ctx) => {
	ctx.webhookReply = false
	try {
		let item = await anime.Details(ctx.chosenInlineResult.result_id);

		let message = "<b>" + item.title + " (" + item.type + ")</b>\n" +
			// "\n═════════════════════════════" +
			(item.title != item.title_english && item.title_english ? "\n<b>English Title :</b> <code>" + item.title_english + "</code>" : "") +
			"\n<b>Year :</b> <code>" + item.aired.from.substr(0, 4) + "</code>" +
			"\n<b>Status :</b> <code>" + item.status + "</code>" +
			"\n<b>Age Rating :</b> <code>" + item.rating + "</code>" +
			"\n<b>Rating :</b> <code>" + item.score + "</code><a href='" + item.image_url + "'>&#8205;</a>" +
			"\n<b>MAL Rank :</b> <code>" + item.rank + "</code>" +
			"\n<b>Studios :</b> <code>" + (item.studios.map((s) => s.name).join(', ')) + "</code>" +
			"\n<b>Genres :</b> <code>" + (item.genres.map((g) => g.name).join(', ')) + "</code>\n" +
			// "\n═════════════════════════════" +
			"\n<code>" + item.synopsis.replace('[Written by MAL Rewrite]', '') + "</code>"
		return ctx.editMessageText(message, {
			parse_mode: 'HTML',
			reply_markup: Markup.inlineKeyboard([
				[Markup.urlButton('Watch Trailer', item.trailer_url)],
				[Markup.urlButton('View In MyAnimeList.net', item.url)]
			])
		})
	}
	catch (err) {
		console.log(err)
	}
})

bot.launch({
	webhook: {
		domain: process.env.BOT_DOMAIN,
		port: process.env.PORT
	}
})

// bot.launch()
