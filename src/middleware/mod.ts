import { Composer } from "grammy";
import ping from "./ping.ts";
import { error } from "./error.ts";

const composer = new Composer();
composer.use(ping);

export { error };
export default composer;
