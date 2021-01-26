var bot = require("./Bot.js")

exports.author = class {
    constructor(client,a_data){
        this.client = client
        this.actions = new bot.Actions(client.token)
        this.username = a_data.username
        this.id = a_data.id
        this.discriminator = a_data.discriminator
        this.avatar = a_data.avatar
        this.avatar_url = `https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}.webp?size=1024`
    }
}

exports.channel = class {
    constructor(client,id){
        this.id = id
        this.actions = new bot.Actions(client.token)
    }

    send(id, content){
        this.actions.create_msg(id,content)
    }

    send(content){
        this.actions.create_msg(this.id,content)
    }
}

exports.guild = class {
    constructor(client,data){
        this.g = data.d
        this.name = this.g.name
        this.id = this.g.id
        //this.
    }
}

exports.message = class {
    constructor(client,data){
        this.client = client
        this.data = data
        this.m = data.d
        this.actions = new bot.Actions(client.token)
        this.content = this.m.content
        this.timestamp = this.m.timestamp
        this.id = this.m.content
        this.author = new exports.author(client, this.m.author)
        this.nonce = this.m.nonce
        this.pinned = this.m.pinned
        this.channel = new exports.channel(client,this.m.channel_id)

        //this.data = undefined //Undefines so data does not show up
    }
}

exports.context = class{
    constructor(client, data){
        this.client = client
        this.bot = client
        this.data = data.d
        this.actions = new bot.Actions(client.token)
        this.args = this.data.content.split(" ")
        this.args.shift()
        this.arg = this.args.join(" ")
        this.author = new exports.author(client, this.data.author)
        
        //this.data = undefined //Undefines so data does not show up
    }

    send(content){
        console.log(this.data.channel_id)
        this.actions.create_msg(this.data.channel_id,content)
    }

    add_reaction(emoji){
        this.actions.add_reaction({channel_id:this.data.channel_id, message_id:this.data.id,emoji:emoji})
    }

    typing(){
        this.actions.typing({channel_id:this.data.channel_id})
    }

}