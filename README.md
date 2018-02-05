# Typescript twitch bot
Simple twitch bot implementation in typescript.

## Preparation
Create `credentials.env` file at root folder of application with content:
```
LOGIN=BotLogin
PASS=BotToken
CHANNEL=#bot-channel
```

## Installation and execution

* Local installation

Once:
```
npm install && npm run build
```
Then:
```
npm start
```

## Docker installation
```
docker-compose up
```

## Usage
Use textual command "!help" in twitch chat.