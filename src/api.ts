export interface ILoggerMethod {
    (msg: string, ...args: any[]): void
    (obj: object, msg?: string, ...args: any[]): void
}

export interface ILogger {
    debug: ILoggerMethod
    info: ILoggerMethod
    warn: ILoggerMethod
    error: ILoggerMethod
}

export interface IBot {
    readonly logger: ILogger
    readonly commands: IBotCommand[]
    start(logger: ILogger, config: IBotConfig): void
}

export interface IBotConfig {
    login: string
    pass: string
    channel: string
}

export interface IBotHelp {
    command: string
    description: string
}

export interface IBotCommand {
    init(bot: IBot): void
    getHelp(): IBotHelp
    isCompatible(msg: string): boolean
    process(msg: IBotMessage): Promise<void>
}

export interface IBotMessage {
    send(msg: string): void
}