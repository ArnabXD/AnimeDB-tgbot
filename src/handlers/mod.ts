import { Composer } from "grammy";
import callback from "./callbackQuery.ts";
import inline from "./inlineQuery.ts";

const composer = new Composer();
composer.use(callback, inline);

export default composer;
