import * as DotEnv from 'dotenv'
import { IBotConfig, ILogger } from './api'
import { Bot } from './bot'

DotEnv.config({ path: './credentials.env' })

const logger: ILogger = console
const config: IBotConfig = {
    channel: process.env.CHANNEL as string,
    login: process.env.LOGIN as string,
    pass: process.env.PASS as string
}

const bot = new Bot()
bot.start(logger, config)