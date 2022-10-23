const { CommandInteraction, MessageEmbed, Client } = require('discord.js');

const { msg_not_in_channel } = require('../../Structures/config.json');
const { msg_aleady_voice } = require('../../Structures/config.json');
const { color_blue, color_green, color_red } = require('../../Structures/config.json');





module.exports = {
    name: "musique",
    description: "sytstem de musique",
    options: [{
        name: "play",
        description: "🎶 Joue de la musique",
        type: "SUB_COMMAND",
        options: [{ name: "query", description: "Nom ou URL de la musique", type: "STRING", required: true }]
    },
    {
        name: "volume",
        description: "🔊 Modifie le volume",
        type: "SUB_COMMAND",
        options: [{ name: "percent", description: "10 = 10% (Défaut = 50%)", type: "NUMBER", required: true }]

    },
    {
        name: "settings",
        description: "⚙ parametres",
        type: "SUB_COMMAND",
        options: [{
            name: "options", description: "Selectioner un paramètre.", type: "STRING", required: true,
            choices: [
                { name: "▶ Pause", value: "pause" },
                { name: "⏸ Resume", value: "resume" },
                { name: "⏭ Skip", value: "skip" },
                { name: "⏹ Stop", value: "stop" },
                { name: "🔜 Queue", value: "queue" },
                { name: "🔁 basculer le mode de répétition", value: "repeat" },
                { name: "🔃 basculer le mode autoplay", value: "autoplay" },
            ]
        }],

    },
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * 
     */


    async execute(interaction) {
        const { options, member, guild, channel } = interaction;
        const voicechannel = member.voice.channel;
        if (!voicechannel) {
            return interaction.reply({ embeds: [new MessageEmbed().setDescription(msg_not_in_channel).setColor(color_red)], ephemeral: true })
        }
        if (guild.me.voice.channelId && voicechannel.id !== guild.me.voice.channelId) {
            return interaction.reply({ embeds: [new MessageEmbed().setDescription(msg_aleady_voice + `<#${guild.me.voice.channelId}>`).setColor(color_red)], ephemeral: true });
        }


        switch (options.getSubcommand()) {

            case "play": {
                interaction.client.distube.play(voicechannel, options.getString('query'), { textChannel: channel, member: member });
                return interaction.reply({ embeds: [new MessageEmbed().setDescription(`🔎 Recherche en cours...`).setColor(color_blue)] });
            }
            case "volume": {
                const volume = options.getNumber('percent');
                if (volume > 100 || volume < 1) {
                    return interaction.reply({ embeds: [new MessageEmbed().setDescription("❌ Vous devez spécifier un chiffre entre 1 et 100").setColor(color_red)] });
                }
                interaction.client.distube.setVolume(voicechannel, volume);
                return interaction.reply({ embeds: [new MessageEmbed().setDescription(`🔊 Volume réglé a \`${volume}%\``).setColor(color_blue)] });
            }
            case 'settings': {
                const queue = await interaction.client.distube.getQueue(voicechannel);
                if (!queue) {
                    return interaction.reply({ embeds: [new MessageEmbed().setDescription("⛔ Aucune musique dans la file d'attente").setColor(color_red)] })
                }
                switch (options.getString("options")) {
                    case "skip": {
                        try {
                            await queue.skip(voicechannel);
                            return interaction.reply({ embeds: [new MessageEmbed().setDescription("⏩ Musique suivante !").setColor(color_blue)] })
                        } catch (err) {
                            return interaction.reply({ embeds: [new MessageEmbed().setDescription("⛔ Aucune musique à skip.").setColor(color_red)] })
                        }
                    }
                    case "stop": {
                        try {
                        await queue.stop(voicechannel);
                        return interaction.reply({ embeds: [new MessageEmbed().setDescription("👋 Déconnexion _(la file d'attente à été clear)_").setColor(color_blue)] })
                        } catch (err) {
                            return 
                        }
                    }
                    case "pause": {
                        try {
                            await queue.pause(voicechannel);
                            return interaction.reply({ embeds: [new MessageEmbed().setDescription("▶️ Musique en pause !").setColor(color_blue)] })
                        } catch (err) {
                            return interaction.reply({ embeds: [new MessageEmbed().setDescription("⛔ La musique est déjà en pause.").setColor(color_red)] })
                        }
                    }
                    case "resume": {
                        try {
                            await queue.resume(voicechannel);
                            return interaction.reply({ embeds: [new MessageEmbed().setDescription("⏸ Musique relancer !").setColor(color_blue)] })
                        } catch (err) {
                            return interaction.reply({ embeds: [new MessageEmbed().setDescription("⛔ La musique est déjà relancée.").setColor(color_red)] })
                        }
                    }
                    case "autoplay": {
                        let Mode = await queue.toggleAutoplay(voicechannel);
                        return interaction.reply({ embeds: [new MessageEmbed().setDescription(`🔃 Mode AutoPlay est maintenant sur \`${Mode ? "On" : "Off"}\``).setColor(color_blue)] })
                    }
                    case "repeat": {
                        let Mode2 = await interaction.client.distube.setRepeatMode(queue);
                        return interaction.reply({ embeds: [new MessageEmbed().setDescription(`🔃 Mode Répétition est maintenant sur \`${Mode2 = Mode2 ? Mode2 == 2 ? "Queue" : 'Song' : "Off"}\``).setColor(color_blue)] })
                    }
                    case "queue": {
                        return interaction.reply({
                            embeds: [new MessageEmbed()
                                .setColor("0x1ab2ff")
                                .setDescription(`${queue.songs.map(
                                    (song, id) => `\n**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
                                )}`)]
                        });
                    }
                        return;
                }
            }
        }
    }
}

