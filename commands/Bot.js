WebSocket = require("ws")
var events = require('events');
var EventEmitter = require('events').EventEmitter
const fetch = require("node-fetch")
var formats = require("./Formats.js")

exports.Actions = class {
    constructor(auth){
        this.auth = auth
        this.guilds = new Map()
    } 
    create_msg(cid, content){

        const data = {
            "content": content,
            "tts": false
        };

        fetch(`https://discord.com/api/channels/${cid}/messages`, {
            method: 'POST',
            body: new URLSearchParams(data),
            headers: {"Authorization":`Bot ${this.auth}`},
        }).then(resp=>resp.json()).then(d=>JSON.stringify(d)) //.then(console.log)
    }

    add_reaction(data={}){
        fetch(`https://discord.com/api/channels/${data.channel_id}/messages/${data.message_id}/reactions/${encodeURI(data.emoji)}/@me`, {
            method: 'PUT',
            headers: {"Authorization":`Bot ${this.auth}`},
        }).then(resp=>resp.json()).then(d=>JSON.stringify(d)) //.then(console.log)
    }

    typing(data={}){
        fetch(`https://discord.com/api/channels/${data.channel_id}/typing`, {
            method: 'POST',
            headers: {"Authorization":`Bot ${this.auth}`},
        }).then(resp=>resp.json()).then(d=>JSON.stringify(d)) //.then(console.log)
    }

    reply_msg(data={},content){
    

        const send_data = {
            content: content,
            tts: false,
            message_reference: {message_id:data.message_id, guild_id:data.guild_id, channel_id:data.channel_id}
        };

        //console.log(send_data)

        fetch(`https://discord.com/api/channels/${data.channel_id}/messages`, {
            method: 'POST',
            body: JSON.stringify(send_data),
            headers: {"Authorization":`Bot ${this.auth}`, "Content-Type":"application/json"},
        }).then(resp=>resp.json()).then(d=>JSON.stringify(d)) //.then(console.log)
    }
}












exports.Bot = class {
    constructor(command_prefix=""){
        this.prefix = command_prefix;
        this.cmd = new EventEmitter()
        this.events = new EventEmitter()
        this.cache = {}
        this.guilds = new Map()
        this.heartbeat_start = 0
        this.token = null
        this.actions = null
    }


    
    run(token){
        this.token = token
        const ws = new WebSocket('wss://gateway.discord.gg?v=8&encoding=json');
        new exports.Actions("NzkwNDM1MTExMDc3NDEyODY0.X-AkEA.s-YvRB89mDe9vCG64nwVIrQK3l4")

        var data = {
            "op": 2,
            "d": {
                "token": token,
                "intents": 32767,//32509,
                "properties": {
                "$os": "linux"
                }
        }
        }

        let seq = null

        function heartbeat_func(){
                let hbdata = {
                    "op":1,
                    "d":seq
                }
                this.heartbeat_start = new Date();
                ws.send(JSON.stringify(hbdata))
            }

        ws.on('open', function open() {
            
        ws.send(JSON.stringify(data))


        setInterval(heartbeat_func, 41250)

        });




        msg: ws.on('message', (data) => {
            let parsed = JSON.parse(data)
            seq = JSON.parse(data).s
            
            if(parsed.op == 11) {
                const heartbeat_end = new Date();
                //console.log(heartbeat_end)
                //console.log(this.heartbeat_start)
                //return console.log(heartbeat_end - this.heartbeat_start)
            };

            //console.log(data)


            if(parsed.t == "MESSAGE_CREATE"){

                this.events.emit("message", new formats.message(this, parsed))

                if(!parsed.d.content.startsWith(this.prefix)){
                    return
                }

                parsed.d.content = parsed.d.content.substring(this.prefix.length)

                let content = parsed.d.content.split(" ")[0]

                this.cmd.emit(content,new formats.context(this, parsed))
            }

            if(parsed.t=="GUILD_CREATE"){
                    this.guilds.set(parsed.d.id, new formats.guild(this,parsed))
            }

        });



    }
}
