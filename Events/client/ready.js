const {Client} = require('discord.js');
const mongoose= require('mongoose');
const {database} = require('../../Structures/config.json')

module.exports ={
    name: 'ready',
    once: true,
    /**
     * 
     * @param {Client} client 
     */
    async execute(client){
        console.log(`Bot is online ✅ => ${client.user.tag} - ID: (${client.user.id})`);
        
        if(!database) return;
        mongoose.connect(database, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => {
            console.log("DataBase is now connected ✅")
        }).catch((err) => {console.log(err)});
        //client.application.commands.cache.map(command => {command.delete();});
    }

}