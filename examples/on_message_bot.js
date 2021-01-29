const Discord = require("commandcord.js")
const bot = new Discord.commands.Bot()

bot.events.on("message", (m) => {
    if(m.content === "!ping"){
        await m.channel.send("pong!")
    }
})

// When '!ping' is typed, then the bot will reply with 'pong!'. 

bot.run("BOT_TOKEN")
