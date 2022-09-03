import { Composer } from "grammy";
import ping from "./ping.ts";

const composer = new Composer();
composer.use(ping);

export default composer;
