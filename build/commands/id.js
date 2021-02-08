"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const id = telegraf_1.Composer.command('id', async (ctx) => {
    var _a;
    return await ctx.replyWithHTML(`<b>User ID :</b> <i>${(_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id}</i>\n` +
        (ctx.message.chat.type !== 'private' ? `<b>Chat ID :</b> <i>${ctx.message.chat.id}</i>` : ''));
});
exports.default = id;
