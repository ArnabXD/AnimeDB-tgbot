"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const start_1 = __importDefault(require("./start"));
const help_1 = __importDefault(require("./help"));
const anime_1 = __importDefault(require("./anime"));
const manga_1 = __importDefault(require("./manga"));
const id_1 = __importDefault(require("./id"));
const bot = new telegraf_1.Composer();
bot.use(start_1.default, help_1.default, anime_1.default, manga_1.default, id_1.default);
exports.default = bot;
