import { Composer } from 'telegraf';

import cmd, { CommandContext } from './cmd';
import ping from './ping';

export default new Composer<CommandContext>().use(
    cmd,
    ping
);

export { CommandContext };