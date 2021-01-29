# Commandcord.js
#### A javascript/node.js discord API wrapper making commands easier than current wrappers.

####  [Support Server](https://rjson.dev/support)
![DISCORD](https://img.shields.io/discord/708124653411106888?color=7289da&logo=discord&logoColor=white)

## Table Of Contents
<a href="#">Commandcord.js</a><br>
<a href="#Stats">Stats</a><br>
<a href="#install">Install</a><br>
<a href="#basic-commands-bot">Command Example</a><br>
<a href="#basic-on_message-bot">On Message Example</a><br>

## Stats
[![NPM](https://nodei.co/npm/commandcord.js.png)](https://nodei.co/npm/commandcord.js/v/latest)

## Install
```npm i commandcord.js```

## Basic Commands Bot
Simple `!ping` pong bot using commands

```js
const Discord = require("commandcord.js")
const bot = new Discord.commands.Bot(command_prefix="!")

bot.cmd.on("ping", (ctx) => {
    ctx.send("pong!")
})

/*
When '!ping' is typed, then the bot will reply with 'pong!'. 
*/

bot.run("BOT_TOKEN")
```


## Basic on_message Bot
```js
const Discord = require("commandcord.js")
const bot = new Discord.commands.Bot()

bot.events.on("message", (m) => {
    if(m.content === "!ping"){
        await m.channel.send("pong!")
    }
})

/*
When '!ping' is typed, then the bot will reply with 'pong!'. 
*/

bot.run("BOT_TOKEN")
```
