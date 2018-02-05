import { IBot, IBotCommand, IBotHelp, IBotMessage } from '../api'

export class TwitterCommand implements IBotCommand {
    private readonly _twitterUrl = 'https://twitter.com/Leopotam'

    private _bot?: IBot

    public init(bot: IBot): void {
        this._bot = bot
        this._bot.logger.info('Twitter command inited')
    }

    public getHelp(): IBotHelp {
        return { command: '!twitter', description: 'Returns twitter link' }
    }

    public isCompatible(msg: string): boolean {
        return msg === '!twitter'
    }

    public async process(msg: IBotMessage): Promise<void> {
        msg.send(`Twitter link is ${this._twitterUrl}`)
    }
}