import { IBot, IBotCommand, IBotHelp, IBotMessage } from '../api'

export class HelpCommand implements IBotCommand {
    private _bot?: IBot

    public init(bot: IBot): void {
        this._bot = bot
        this._bot.logger.info('Help command inited')
    }

    public getHelp(): IBotHelp {
        return { command: '!help', description: 'Returns help for all supported commands' }
    }

    public isCompatible(msg: string): boolean {
        return msg === '!help'
    }

    public async process(msg: IBotMessage): Promise<void> {
        for (const cmd of this._bot!.commands) {
            const help = cmd.getHelp()
            msg.send(`${help.command}: ${help.description}`)
        }
    }
}