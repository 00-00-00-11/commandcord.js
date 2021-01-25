const Discord = require("./dsc/commands/Bot.js")
const bot = new Discord.Bot(command_prefix="!")

bot.cmd.on("ping", (ctx) => {
    ctx.send("pong!")
})

/*
When `!ping` is typed, then the bot will reply with `pong!`. 
*/

bot.run("BOT_TOKEN")
