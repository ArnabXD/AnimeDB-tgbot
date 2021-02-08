import { Composer } from "telegraf";
import callback from './callbackQuery'
import inline from './inlineQuery';

export default new Composer().use(
    callback,
    inline
)