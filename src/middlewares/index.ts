import { Composer } from 'grammy';
import ping from './ping';

const composer = new Composer();
composer.use(ping);

export default composer;
