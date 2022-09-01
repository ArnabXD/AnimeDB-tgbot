import { Composer } from "grammy";

import start from "./start.ts";
import help from "./help.ts";
import anime from "./anime.ts";
import manga from "./manga.ts";
import id from "./id.ts";

const composer = new Composer();

composer.use(start, help, anime, manga, id);

export default composer;
