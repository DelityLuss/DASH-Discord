const { CommandInteraction, Client, MessageEmbed } = require('discord.js');
const { color_blue, color_green, color_red} = require('../../Structures/config.json')
const {connection} = require('mongoose');

module.exports = {
    name:'statut',
    description:"🏓 Effectue une requête pour connaître le statut du bot",
    /**
     * @param {CommandInteraction} interaction
     * 
     * 
     */
    execute(interaction) {

        ping_bot = Date.now() - interaction.createdTimestamp;
        ping_api = Math.round(interaction.client.ws.ping);
        var uptime = interaction.client.uptime / 60 /60 /60;
        const ping_embed = new MessageEmbed()
            .setTitle("Statut de __"+ interaction.client.user.username +"__🏓")
            .addField("__Latence du bot__", "`" + ping_bot + "ms`", true)
            .addField("__Latence de l'API__", "`" + ping_api + "ms`", true)
            .addField("__Base de données__", "`" + switchTo(connection.readyState) + "`", false)
            .setTimestamp()
            .setColor(color_blue);
        interaction.reply({ embeds: [ping_embed] });
    }
}

function switchTo(val) {
    var status = " ";
    switch(val) {
        case 0 : status = "🔴 Déconnecter"
        break;
        case 1 : status = "🟢 Connecter"
        break;
        case 2 : status = "🟠 Connexion"
        break;
        case 3 : status = "🟣 Déconnexion"

    }
    return status;
}
