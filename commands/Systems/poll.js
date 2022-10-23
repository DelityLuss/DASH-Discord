const { CommandInteraction, MessageEmbed, Permissions } = require('discord.js');

const { color_blue, color_green, color_red } = require('../../Structures/config.json');
const { msg_permission_global } = require('../../Structures/config.json');
module.exports = {
    name: 'poll',
    description: '📊 Permet de créer un sondage',
    options: [{
        name: 'question',
        description: 'question ?',
        required: true,
        type: 'STRING',
    },
    {
        name: 'choix_a',
        description: 'choix ?',
        type: 'STRING',
        required: false,
    },
    {
        name: 'choix_b',
        description: 'choix ?',
        type: 'STRING',
        required: false,
    },
    {
        name: 'choix_c',
        description: 'choix ?',
        type: 'STRING',
        required: false,
    },
    {
        name: 'choix_d',
        description: 'choix ?',
        type: 'STRING',
        required: false,
    },
    {
        name: 'choix_e',
        description: 'choix ?',
        type: 'STRING',
        required: false,
    },
    {
        name: 'choix_f',
        description: 'choix ?',
        type: 'STRING',
        required: false,
    },
    {
        name: 'choix_g',
        description: 'choix ?',
        type: 'STRING',
        required: false,
    },
    {
        name: 'choix_h',
        description: 'choix ?',
        type: 'STRING',
        required: false,
    },
    {
        name: 'choix_i',
        description: 'choix ?',
        type: 'STRING',
        required: false
    },
    {
        name: 'choix_j',
        description: 'choix ?',
        type: 'STRING',
        required: false
    },
    ],


    /**
     * 
     * @param {CommandInteraction} interaction 
     */

    async execute(interaction) {
        if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
            try {
                const question = interaction.options.getString('question');
                const choix_a = interaction.options.getString('choix_a');
                const choix_b = interaction.options.getString('choix_b');
                const choix_c = interaction.options.getString('choix_c');
                const choix_d = interaction.options.getString('choix_d');
                const choix_e = interaction.options.getString('choix_e');
                const choix_f = interaction.options.getString('choix_f');
                const choix_g = interaction.options.getString('choix_g');
                const choix_h = interaction.options.getString('choix_h');
                const choix_i = interaction.options.getString('choix_i');
                const choix_j = interaction.options.getString('choix_j');

                if (choix_a === choix_b) {
                    interaction.reply({ content: "📊 **" + question + '**', fetchReply: true }).then(embedMessage => {
                        embedMessage.react("👍");
                        embedMessage.react("👎");
                    });
                }
                else {
                    element = [choix_a, choix_b, choix_c, choix_d, choix_e, choix_f, choix_g, choix_h, choix_i, choix_j];
                    emoji = ["🇦", "🇧", "🇨", "🇩", "🇪", "🇫", "🇬", "🇭", "🇮", "🇯"];
                    var count = 0;
                    var poll = [];
                    for (const i in element) {
                        if (element[i] == null) {
                            //pass
                        }
                        else {
                            poll.push(emoji[count] + " " + element[i]);
                            count += 1;
                        }
                    }
                    list = poll.join("\n")
                    const poll_embed = new MessageEmbed()
                        .setColor(color_blue)
                        .setTimestamp()
                        .setFooter({
                            text: "Sondage créé par " + interaction.member.displayName
                        })
                        .setDescription(list);
                    interaction.reply({content: "📊 **" + question + '**',embeds: [poll_embed], fetchReply: true }).then(embedMessage => {
                        for (const i in poll) {
                            embedMessage.react(emoji[i]);
                        }
                    });
                }
            } catch (err) {
                const error = new MessageEmbed()
                    .setTitle('⛔ Error, please contact an administrator')
                    .setDescription('Error : ' + err)
                    .setTimestamp()
                    .setColor(color_red);
                interaction.reply({ embeds: [error], ephemeral: true })
            }
        }
        else {
            interaction.reply({ embeds: [new MessageEmbed().setDescription(msg_permission_global).setColor(color_red)], ephemeral: true });
        }
    }
}


