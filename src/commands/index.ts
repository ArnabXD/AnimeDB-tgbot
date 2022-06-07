import { Composer } from 'grammy';

import start from './start';
import help from './help';
import anime from './anime';
import manga from './manga';
import id from './id';

const composer = new Composer();

composer.use(start, help, anime, manga, id);

export default composer;
