const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    try {
        console.log(`Logged in as ${client.user.tag}!`);
    }
    catch (err) {
        console.error(err);
    }
});

client.on('message', msg => {
    if(msg.content === "무한~") {
        msg.reply("무야호~");
    }
});

client.login("ODQ5Njk4NzM2NzY2MTg5NTc4.YLe9nQ.jcuh4aqZZK0rDb28_TdAzy1Bv4s");