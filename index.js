const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const axios = require('axios')
require('dotenv').config()

const bot = new Telegraf(process.env.BOT_TOKEN)

async function Search(key) {
	let config = {
		method: 'get',
		url: `https://api.jikan.moe/v3/search/anime?q=${key}`,
	}
	let response = await axios(config)
	return response.data.results
}

bot.start((ctx) => {
	ctx.webhookReply = false
	ctx.replyWithHTML("<b>Hi There . Have a Great Day</b>\nReport Bug/Errors/Suggesions : <a href='tg://user?id=611816596'>Λгɳαɓ</a>",
		Extra.markup(
			Markup.inlineKeyboard([
				[Markup.switchToCurrentChatButton('Search Anime', '', false)],
				[Markup.urlButton('Help & More', process.env.HELP_LINK || 'https://telegra.ph/AnimeDB-Bot--HELP-08-03')],
				[Markup.urlButton('Rate Me', 'https://t.me/tlgrmcbot?start=animedb_bot-review')]
			])
		))
})
bot.help((ctx) => {
	ctx.webhookReply = false
	ctx.replyWithHTML("<b>Click The Button Below</b>",
		Extra.markup(
			Markup.inlineKeyboard([
				[Markup.urlButton('Help', process.env.HELP_LINK || 'https://telegra.ph/AnimeDB-Bot--HELP-08-03')]
			])
		))
})

bot.on('inline_query', (ctx) => {
	ctx.webhookReply = false
	console.log(`Searching for ${ctx.inlineQuery.query}`)
	Search(ctx.inlineQuery.query)
		.then((results) => {
			let animes = results.map((item) => ({
				type: 'article',
				id: item.mal_id,
				title: item.title,
				description: "✪ " + item.score,
				thumb_url: item.image_url,
				input_message_content: {
					message_text: `<b>Anime :</b> ${item.title}\n` +
						`<b>Type :</b> ${item.type}\n` +
						`<b>Year :</b> ` + (typeof (item.start_date) === 'string' ? item.start_date.substr(0, 4) : item.start_date) + `\n` +
						`<b>Age Rating :</b> ${item.rated}\n` +
						`<b>Rating :</b> ${item.score}<a href="${item.image_url}">&#8205;</a>\n` +
						`<b>Synopsis :</b> ${item.synopsis} <a href="${item.url}">Read More</a>`,
					parse_mode: "HTML"
				},
				reply_markup: Markup.inlineKeyboard([
					[Markup.urlButton('View in MyAnimeList.net', item.url)],
					[Markup.switchToCurrentChatButton('Search More', '', false)]
				])
			}))
			ctx.answerInlineQuery(animes)
		})
		.catch((error) => {
			let animes = []
			ctx.answerInlineQuery(animes)
			console.log(error)
		})
})

// bot.launch({
// 	webhook: {
//  		domain: process.env.BOT_DOMAIN,
//  		port: process.env.PORT
//  	}
// })

bot.launch()
