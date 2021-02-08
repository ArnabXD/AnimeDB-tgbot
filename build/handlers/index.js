"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const callbackQuery_1 = __importDefault(require("./callbackQuery"));
const inlineQuery_1 = __importDefault(require("./inlineQuery"));
exports.default = new telegraf_1.Composer().use(callbackQuery_1.default, inlineQuery_1.default);
