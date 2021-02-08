import { Composer } from 'telegraf';
import { CommandContext } from '../middlewares';

import start from './start';
import help from './help';
import anime from './anime';
import manga from './manga';
import id from './id';

const bot = new Composer<CommandContext>();

bot.use(
    start,
    help,
    anime,
    manga,
    id
);

export default bot;