import { Composer } from 'telegraf';

const id = Composer.command('id', async (ctx) => {
    if (ctx.message.reply_to_message?.from?.id) {
        const { id, first_name } = ctx.message.reply_to_message.from
        return ctx.replyWithHTML(`<b>${first_name}'s ID : </b><i>${id}</i>`)
    }
    return await ctx.replyWithHTML(
        `<b>User ID :</b> <i>${ctx.from?.id}</i>\n` +
        (ctx.message.chat.type !== 'private' ? `<b>Chat ID :</b> <i>${ctx.message.chat.id}</i>` : '')
    )
})

export default id;