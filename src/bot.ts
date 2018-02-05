import { IBot, IBotCommand, IBotConfig, IBotMessage, ILogger } from './api'
import { HelpCommand } from './commands/help'
import { TwitterCommand } from './commands/twitter'
const twitch = require('twitch-js')

class BotMessage implements IBotMessage {
    private _twitchClient: any

    private _channel: string

    constructor(twitchClient: any, channel: string) {
        this._twitchClient = twitchClient
        this._channel = channel
    }

    public send(msg: string): void {
        this._twitchClient.say(this._channel, msg)
    }
}

export class Bot implements IBot {
    private _logger?: ILogger

    private _config?: IBotConfig

    private _client: any

    private _commands: IBotCommand[] = []

    public get commands(): IBotCommand[] {
        return this._commands
    }

    public get logger() { return this._logger! }

    public start(logger: ILogger, config: IBotConfig): void {
        this._logger = logger
        this._config = config

        this._commands = [
            new HelpCommand(),
            new TwitterCommand(),
        ]

        for (const cmd of this._commands) {
            cmd.init(this)
        }

        this.initTwitch()
    }

    private initTwitch() {
        const options = {
            channels: [this._config!.channel],
            // Provide an identity
            identity: {
                username: this._config!.login,
                password: this._config!.pass
            }
        }

        this._client = new twitch.Client(options)

        this._client.on('chat', async (channel: string, userstate: any, message: string, self: boolean) => {
            this.logger.debug(`Message "${message}" received from ${userstate['display-name']}`)

            if (!self) {
                for (const cmd of this._commands) {
                    try {
                        if (cmd.isCompatible(message)) {
                            await cmd.process(new BotMessage(this._client, channel))
                        }
                    } catch (ex) {
                        this.logger.warn(`something wrong here: ${ex}`)
                    }
                }
            }
        })

        this._client.connect()

        this.logger.debug('Twitch connected')
    }
}