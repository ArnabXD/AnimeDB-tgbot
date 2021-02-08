"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const cmd_1 = __importDefault(require("./cmd"));
const ping_1 = __importDefault(require("./ping"));
exports.default = new telegraf_1.Composer().use(cmd_1.default, ping_1.default);
