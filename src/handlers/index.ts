import { Composer } from 'grammy';
import callback from './callbackQuery';
import inline from './inlineQuery';

const composer = new Composer();
composer.use(callback, inline);

export default composer;
