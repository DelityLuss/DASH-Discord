const client = require('../../Structures/index');
const { MessageEmbed } = require('discord.js');




const status = queue =>
    `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(', ') || 'Off'}\` | Loop: \`${queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'
    }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``
client.distube
    .on('playSong', (queue, song) =>
        queue.textChannel.send({
            embeds: [new MessageEmbed()
                .setColor("LUMINOUS_VIVID_PINK")
                .setDescription(
                    `🎶 | Joue \`${song.name}\` - \`${song.formattedDuration}\`\nDemandé par: ${song.user
                    }\n${status(queue)}`
                )]
        })
    )
    .on('addSong', (queue, song) =>
        queue.textChannel.send({
            embeds: [new MessageEmbed()
                .setColor('PURPLE')
                .setDescription(
                    `🎶 | ${song.name} - \`${song.formattedDuration}\` Ajouté à la file d'attente par ${song.user}`
                )]
        })
    )
    .on('addList', (queue, playlist) =>
        queue.textChannel.send({embeds: [new MessageEmbed()
        .setColor("PURPLE")
        .setDescription(
            `\`${playlist.name}\` Ajouter à la playlist (${playlist.songs.length
            } musique) à la file d'attente\n${status(queue)}`
        )]})
    )
    .on('error', (channel, e) => {
        channel.send({embeds: [new MessageEmbed()
        .setColor("RED")
        .setDescription(`⛔ | Une erreur a été rencontrée : ${e.toString().slice(0, 1974)}`)]})
        console.error(e)
    })
    .on('empty',queue => queue.textChannel.send({embeds : [new MessageEmbed()
        .setColor("PURPLE")
        .setDescription('👋 | Le vocal est vide ! Je quitte le vocal...')]}))
    .on('searchNoResult', (message, query) =>
        message.channel.send({embeds: [new MessageEmbed()
        .setColor("RED")
        .setDescription(`⛔ | Aucun résultat trouvé pour \`${query}\`!`)]})
    )
    