"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ping = async (ctx, next) => {
    var _a, _b;
    const start = new Date().getTime();
    ctx.state.time = start;
    await next();
    const ms = new Date().getTime() - start;
    console.log(`${new Date().toTimeString()} >> Update ID: ${ctx.update.update_id} || Response time: ${ms} ms || User: ${(_a = ctx.from) === null || _a === void 0 ? void 0 : _a.first_name} (${(_b = ctx.from) === null || _b === void 0 ? void 0 : _b.id})`);
};
exports.default = ping;
