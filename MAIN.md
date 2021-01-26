# READTHEDOCS MAIN


## commandcord.commands.Bot.bot
### latency
type: int
Latency between HEARTBEAT and HEARTBEAT_ACK


## commandcord.commands.Formats.context

### args
type: List
Returns arguments in a list

### arg
type: String
Returns arguments as one string

### author
type: commandcord.commands.Formats.author
Returns Author object of the user

### send(content)
Sends a message in the same channel that the command was run

### add_reaction(emoji)
Reacts with an emoji on the context message

### typing()
Sets the bot to typing, ends when the bot sends a message


## commandcord.commands.Formats.message

### content
type: String
Returns a string of the content of the message

### author
type: commandcord.commands.Formats.author
Returns a user object of the author of the message

### timestamp
type: String
Time that the message was sent

### id
type: String
ID of the message

### nonce
type: String
Nonce of the message

### pinned
type: Bool
If the message is pinned or not

### channel
type: commandcord.commands.Formats.channel
Returns a channel object for the channel of the message
