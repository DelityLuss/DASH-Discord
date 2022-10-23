const { CommandInteraction, MessageEmbed, Permission } = require('discord.js');



module.exports = {
    name: 'help',
    description: '❓ Liste de toutes les commandes ',


    /**
     * 
     * @param {CommandInteraction} interaction 
     */

    async execute(interaction) {

        const help_emebd = new MessageEmbed()
            .setTitle("📋 Help")
            .setDescription("Pour exécuter une commande dans " + interaction.guild.name + ", utilisez `/command`")
            .addField(":arrow_right: __Commande de base__", "**`/help`:** Affiche une liste des commandes disponibles\n\n**`/statut`:** Vérifie le ping du bot vers le serveur Discord.", false)
            .addField(":arrow_right: __Système__", "**`/poll <question> <choix>`**: Permet de créer un sondage\n\n**`/musique play <url YT/Soundcloud/Spotify> ou <nom> ou <url playlist>`**: Joue de la musique dans le vocal.\n\n**`/musique settings <options>`**: Permet de gérer la musique (pause, skip, stop...)", false)
            .setFooter({
                text: "By Luss"
            })
            .setThumbnail("https://cdn.discordapp.com/attachments/834864124089466900/932062229862420541/f9962afdb427a6d0af3dd7aed2614e7c.png")
            .setColor("0x0091ff");

        await interaction.member.send({ embeds: [help_emebd], fetchReply: true }).then(embedMessage => {embedMessage.react("👍"); const url = embedMessage.url;interaction.reply({ embeds: [new MessageEmbed().setTitle('Help').setDescription(`Je t'ai envoyé un [message direct](${url}) avec les commandes.`).setColor("f7b723")], ephemeral: true });});
        
    }
}
