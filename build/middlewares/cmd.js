"use strict";
// Modified Version of -> https://github.com/telegraf/telegraf-command-parts/blob/da799b344b723e09c0c936bd5fbdd344bda4033e/index.js#L3
Object.defineProperty(exports, "__esModule", { value: true });
const regex = /^\/([^@\s]+)@?(?:(\S+)|)\s?([\s\S]+)?$/i;
const cmd = async (ctx, next) => {
    var _a;
    if (!ctx.message || !('text' in ctx.message))
        return next();
    const parts = regex.exec(ctx.message.text.trim());
    if (!parts)
        return next();
    const command = {
        text: ctx.message.text,
        command: parts[1],
        bot: (_a = parts[2]) !== null && _a !== void 0 ? _a : ctx.botInfo.username,
        args: parts[3],
        splitArgs: () => !parts[3] ? [] : parts[3].split(/\s+/).filter(arg => arg.length)
    };
    ctx.state.command = command;
    return next();
};
exports.default = cmd;
