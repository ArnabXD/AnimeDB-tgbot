import { Context, MiddlewareFn } from 'telegraf';

const ping: MiddlewareFn<Context> = async (ctx, next) => {
    const start = new Date().getTime()
    ctx.state.time = start
    await next()
    const ms = new Date().getTime() - start
    console.log(`${new Date().toTimeString()} >> Update ID: ${ctx.update.update_id} || Response time: ${ms} ms || User: ${ctx.from?.first_name} (${ctx.from?.id})`)
}

export default ping