// Modified Version of -> https://github.com/telegraf/telegraf-command-parts/blob/da799b344b723e09c0c936bd5fbdd344bda4033e/index.js#L3

import { MiddlewareFn, Context } from 'telegraf';

const regex = /^\/([^@\s]+)@?(?:(\S+)|)\s?([\s\S]+)?$/i;

export interface CommandContext extends Context {
    state: {
        command: {
            text: string,
            command: string,
            bot: string | null,
            args: string,
            splitArgs: () => string[] | []
        }
    }
}

const cmd: MiddlewareFn<CommandContext> = async (ctx, next) => {
    if (!ctx.message || !('text' in ctx.message)) return next();
    const parts = regex.exec(ctx.message.text.trim());
    if (!parts) return next();
    const command = {
        text: ctx.message.text,
        command: parts[1],
        bot: parts[2] ?? ctx.botInfo.username,
        args: parts[3],
        splitArgs: () => !parts[3] ? [] : parts[3].split(/\s+/).filter(arg => arg.length)
    };
    ctx.state.command = command
    return next();
}

export default cmd