const Discord = require('discord.js');
const DB = require('./schemas/TicketDB');
const { glob } = require('glob');
const settings = require('./schemas/SettingsDB');
const {
    createTranscript
} = require('discord-html-transcripts');
const {
    MessageActionRow,
    MessageButton,
    Permissions,
    Collection
} = require('discord.js');
const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.DIRECT_MESSAGES,
        Discord.Intents.FLAGS.GUILD_VOICE_STATES,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ]
});

//invite => https://discord.com/api/oauth2/authorize?client_id=945322812950868089&permissions=8&scope=bot%20applications.commands
//WBYd0EyPaGuVQZdu

//      _               
//    / /_  ____________
//   / / / / / ___/ ___/
//  / / /_/ (__  |__  ) 
// /_/\__,_/____/____/  

const prefix = "dev!"; //Non modifiable !
client.commands = new Collection();

const {
    DisTube
} = require('distube')
const {
    SpotifyPlugin
} = require('@distube/spotify')
const {
    SoundCloudPlugin
} = require('@distube/soundcloud')
const {
    YtDlpPlugin
} = require('@distube/yt-dlp')

client.distube = new DisTube(client, {
    leaveOnStop: true,
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    plugins: [
        new SpotifyPlugin({
            emitEventsAfterFetching: true
        }),
        new SoundCloudPlugin(),
        new YtDlpPlugin()
    ],
    youtubeDL: false
})



require("./handlers/Events")(client);
require("./handlers/Commands")(client);
require("../Systems/GiveawaySys")(client);

//----------------------------------------------------------------
const {
    token
} = require('./config.json');
const {
    log
} = require('./config.json');
const {
    Mute_role
} = require('./config.json');
const {
    logs_channel_id
} = require('./config.json');
const {
    event_channel_id
} = require('./config.json');
const {
    msg_permission_global
} = require('./config.json');
const {
    msg_successfully_deleted
} = require('./config.json');
const {
    msg_successfully_modified
} = require('./config.json');
const {
    msg_global_error
} = require('./config.json');
const {
    EVERYONEID
} = require('./config.json');
const {
    PARENTID
} = require('./config.json');
const {
    PINGROLETICKET
} = require('./config.json');
const {
    TRANSCRIPTEID
} = require('./config.json');
const {
    TICKETROLE
} = require('./config.json');
const {
    msg_event_add_user
} = require('./config.json');
const {
    msg_event_add_user_warning
} = require('./config.json');
const {
    msg_event_full_user
} = require('./config.json');
const {
    msg_event_remove_user
} = require('./config.json');
const {
    Anti_Crash, log_crash, server_id, invite_tracker
} = require('./config.json');
const {
    color_blue,
    color_green,
    color_red
} = require('./config.json');






//----------------------------------------------------------------

var player_ok = [];
var player_notok = [];
var player_wok = [];
var player_wlist = [];
var ping_user_event = [];
var timeout = 4000;
var maintenant = false;

max = "12";

client.on("ready", async () => {
    if (maintenant === false) {
        client.user.setActivity("/help");
        client.user.setPresence({
            status: "online",
        })
    }
    else {
        client.user.setActivity("Maintenance 🔴");
        client.user.setPresence({
            status: "dnd",
        })
    }
})

//----------------------------------------------------------------    
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    if (maintenant === false) {
        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            const error_emebed = new Discord.MessageEmbed().setColor(color_red).setDescription(`⛔ Une erreur s\'est produite lors de l\'exécution de cette commande !\n**Erreur**: \`${error}\``).setTitle("S'il vous plaît contacter Luss#5744")
            await interaction.reply({
                embeds: [error_emebed],
                ephemeral: true
            });
            if (log === true) {
                const error_emebed = new Discord.MessageEmbed().setColor(color_red).setDescription(`⛔ Une erreur s\'est produite lors de l\'exécution de la command ${interaction.commandName} !\n**Erreur**: \`${error}\``).setTitle("Command error")
                await interaction.client.channels.cache.get(logs_channel_id).send({
                    embeds: [error_emebed],
                });
            }
        }
    }
    else {
        if (interaction.member.id === "445616779952390164") {
            const command = client.commands.get(interaction.commandName);

            if (!command) return;

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                const error_emebed = new Discord.MessageEmbed().setColor(color_red).setDescription(`⛔ Une erreur s\'est produite lors de l\'exécution de cette commande !\n**Erreur**: \`${error}\``).setTitle("S'il vous plaît contacter Luss#5744")
                await interaction.reply({
                    embeds: [error_emebed],
                    ephemeral: true
                });
            }
        }
        else {
            const error_emebed = new Discord.MessageEmbed().setColor(color_red).setTitle(`⛔ Une maintenance est en cours sur le bot.`).setDescription("Toutes les commandes sont désactivées sur le serveur.\n").setFooter({ text: "Pour plus d'informations contactez Luss#5744" })
            await interaction.reply({
                embeds: [error_emebed],
                ephemeral: true
            });
        }
    }
});
//----------------------------------------------------------------
if (Anti_Crash === true) {
    const embed = new Discord.MessageEmbed()
        .setTitle("Anti-Crash")
        .setColor(color_red)
        .setFooter({ text: "Contacter Luss#5744" });

    process.on('unhandledRejection', (reason, p) => {
        console.log(' [antiCrash] :: Unhandled Rejection/Catch');
        if (log_crash === true) {
            client.channels.cache.get(logs_channel_id).send({
                embeds: [embed.setDescription('⛔ **Erreur**: \`[antiCrash] :: Unhandled Rejection/Catch\`')]
            });
        }
        console.log(reason, p);
    });
    process.on("uncaughtException", (err, origin) => {
        console.log(' [antiCrash] :: Uncaught Exception/Catch');
        if (log_crash === true) {
            client.channels.cache.get(logs_channel_id).send({
                embeds: [embed.setDescription('⛔ **Erreur**: \`[antiCrash] :: Uncaught Exception/Catch\`')]
            });
        }
        console.log(err, origin);
    })
    process.on('uncaughtExceptionMonitor', (err, origin) => {
        console.log(' [antiCrash] :: Uncaught Exception/Catch (MONITOR)');
        if (log_crash === true) {
            client.channels.cache.get(logs_channel_id).send({
                embeds: [embed.setDescription('⛔ **Erreur**: \`[antiCrash] :: Uncaught Exception/Catch (MONITOR)\`')]
            });
        }
        console.log(err, origin);
    });
    process.on('multipleResolves', (type, promise, reason) => {
        console.log(' [antiCrash] :: Multiple Resolves');
        if (log_crash === true) {
            client.channels.cache.get(logs_channel_id).send({
                embeds: [embed.setDescription('⛔ **Erreur**: \`[antiCrash] :: Multiple Resolves\`')]
            });
        }
        console.log(type, promise, reason);
    });
}



//----------------------------------------------------------------





//----------------------------------------------------------------

//----------------------------------------------------------------
client.on("interactionCreate", async interaction => {
    if (interaction.isButton()) {
        if (interaction.customId === "accept") {
            if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
                let currentEmbed = interaction.message.embeds[0];
                currentEmbed.fields.forEach(field => {
                    if (field.name == "Statut") {
                        field.value = "Valider";
                    }
                    currentEmbed.setColor(color_green)
                });
                interaction.message.edit({
                    embeds: [currentEmbed]
                });
                interaction.reply({
                    embeds: [new Discord.MessageEmbed().setDescription(msg_successfully_modified).setColor(color_green)],
                    ephemeral: true
                });
            } else {
                interaction.reply({
                    embeds: [new Discord.MessageEmbed().setDescription(msg_permission_global).setColor(color_red)],
                    ephemeral: true
                });
            }
        } else if (interaction.customId === "decline") {
            if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
                let currentEmbed = interaction.message.embeds[0];
                currentEmbed.fields.forEach(field => {
                    if (field.name == "Statut") {
                        field.value = "Refuser";
                    }
                    currentEmbed.setColor(color_red);
                });
                interaction.message.edit({
                    embeds: [currentEmbed]
                })
                interaction.reply({
                    embeds: [new Discord.MessageEmbed().setDescription(msg_successfully_modified).setColor(color_green)],
                    ephemeral: true
                });
            } else {
                interaction.reply({
                    embeds: [new Discord.MessageEmbed().setDescription(msg_permission_global).setColor(color_red)],
                    ephemeral: true
                });
            }
        } else if (interaction.customId === "close") {
            if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
                interaction.message.delete()
                interaction.reply({
                    embeds: [new Discord.MessageEmbed().setDescription(msg_successfully_deleted).setColor(color_green)],
                    ephemeral: true
                });
            } else {
                interaction.reply({
                    embeds: [new Discord.MessageEmbed().setDescription(msg_permission_global).setColor(color_red)],
                    ephemeral: true
                });
            }
        } else if (interaction.customId === "open_ticket") {
            const {
                guild,
                member
            } = interaction;

            const ID = Math.floor(Math.random() * 90000) + 10000;

            guild.channels.create(`Ticket-` + ID.toString(), {
                type: "GUILD_TEXT",
                parent: PARENTID,
                permissionOverwrites: [{
                    id: member.id,
                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"],
                },
                {
                    id: EVERYONEID,
                    deny: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"],
                },
                {
                    id: TICKETROLE,
                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"],
                }
                ]
            }).then(async (channel) => {
                await DB.create({
                    GuildID: guild.id,
                    MemberID: member.id,
                    TicketID: ID,
                    ChannelID: channel.id,
                    Closed: false,
                    Locked: false,
                });
                const embed = new Discord.MessageEmbed()
                    .setAuthor({
                        name: `${guild.name} | Ticket: ${ID.toString()}`,
                        iconURL: guild.iconURL({
                            dynamic: true
                        })
                    })
                    .setDescription('Ticket ouvert par: ' + "<@" + member + ">" + " | " + "||" + member.id + "||" + '\nLe staff va vous répondre le plus vite possible merci de votre patience !\n\n**Nb** : ne mentionner pas le staff merci !')
                    .setFooter({
                        text: guild.name + " | système de ticket",
                        iconURL: guild.iconURL({
                            dynamic: true
                        })
                    })
                    .setColor(color_green);

                const button = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId("close_ticket")
                            .setLabel("Fermer")
                            .setStyle("PRIMARY")
                    )

                    .addComponents(
                        new MessageButton()
                            .setCustomId("lock")
                            .setLabel("🔒| Lock")
                            .setStyle("PRIMARY")
                    )
                    .addComponents(
                        new MessageButton()
                            .setCustomId("unlock")
                            .setLabel("🔓| Unlock")
                            .setStyle("PRIMARY")
                    );

                channel.send({
                    embeds: [embed],
                    components: [button]
                });

                channel.send(`${member} ${"<@&" + PINGROLETICKET + ">"} Nouveau ticket`).then((msg) => {
                    setTimeout(() => {
                        msg.delete().catch(() => { });
                    }, 1 * 5000);
                })

                interaction.reply({
                    embeds: [new Discord.MessageEmbed().setColor(color_green).setDescription(`${member.displayName} ton billet a été créé. ${channel}`)],
                    ephemeral: true
                })
            });

        } else if (interaction.customId === "lock") {
            const {
                guild,
                member,
                channel
            } = interaction;
            if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
                const embed = new Discord.MessageEmbed().setColor(color_blue);

                DB.findOne({
                    ChannelID: channel.id
                }, async (err, docs) => {
                    if (err) throw err;
                    if (!docs)
                        return interaction.reply({
                            embeds: [new Discord.MessageEmbed().setDescription("❌ Aucune donnée n'a été trouvée concernant le ticket, merci de le faire manuellement.").setColor(color_red)],
                            ephemeral: true
                        });

                    if (docs.Locked == true)
                        return interaction.reply({
                            embeds: [new Discord.MessageEmbed().setDescription("❌ le ticket est déjà verrouillé.").setColor(color_red)],
                            ephemeral: true
                        });

                    await DB.updateOne({
                        ChannelID: channel.id
                    }, {
                        Locked: true
                    });
                    embed.setDescription('🔒 | Ce ticket est maintenant verrouillé. ');
                    channel.permissionOverwrites.edit(docs.MemberID, {
                        SEND_MESSAGES: false,
                    });
                    return interaction.reply({
                        embeds: [embed]
                    })
                });


            } else {
                interaction.reply({
                    embeds: [new Discord.MessageEmbed().setDescription(msg_permission_global).setColor(color_red)],
                    ephemeral: true
                });
            }

        } else if (interaction.customId === "unlock") {
            const {
                guild,
                member,
                channel
            } = interaction;
            if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
                const embed = new Discord.MessageEmbed().setColor(color_blue);

                DB.findOne({
                    ChannelID: channel.id
                }, async (err, docs) => {
                    if (err) throw err;
                    if (!docs)
                        return interaction.reply({
                            embeds: [new Discord.MessageEmbed().setDescription("❌ Aucune donnée n'a été trouvée concernant le ticket, merci de le faire manuellement.").setColor(color_red)],
                            ephemeral: true
                        });

                    if (docs.Locked == false)
                        return interaction.reply({
                            embeds: [new Discord.MessageEmbed().setDescription("❌ le ticket est déjà déverrouiller.").setColor(color_red)],
                            ephemeral: true
                        });

                    await DB.updateOne({
                        ChannelID: channel.id
                    }, {
                        Locked: false
                    });
                    embed.setDescription('🔓 | Ce ticket est maintenant déverrouiller. ');
                    channel.permissionOverwrites.edit(docs.MemberID, {
                        SEND_MESSAGES: true,
                    });
                    return interaction.reply({
                        embeds: [embed]
                    })
                });


            } else {
                interaction.reply({
                    embeds: [new Discord.MessageEmbed().setDescription(msg_permission_global).setColor(color_red)],
                    ephemeral: true
                });
            }

        } else if (interaction.customId === "close_ticket") {
            const {
                guild,
                member,
                channel
            } = interaction;
            if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
                const embed = new Discord.MessageEmbed().setColor(color_blue);

                DB.findOne({
                    ChannelID: channel.id
                }, async (err, docs) => {
                    if (err) throw err;
                    if (!docs)
                        return interaction.reply({
                            embeds: [new Discord.MessageEmbed().setDescription("❌ Aucune donnée n'a été trouvée concernant le ticket, merci de le faire manuellement.").setColor(color_red)],
                            ephemeral: true
                        });

                    if (docs.Closed == true)
                        return interaction.reply({
                            embeds: [new Discord.MessageEmbed().setDescription("❌ le ticket est déjà fermé.").setColor(color_red)],

                            ephemeral: true
                        });


                    channel.permissionOverwrites.edit(docs.MemberID, {
                        SEND_MESSAGES: false,
                        VIEW_CHANNEL: false,
                        READ_MESSAGE_HISTORY: false

                    })
                    const embed_r = new Discord.MessageEmbed().setColor(color_blue).setTitle("Ticket options de fermeture").setDescription("Fermmer le ticket sans sauvegarder\nFermer les tickets en le sauvegardant")
                    const attachement = await createTranscript(channel, {
                        limit: -1,
                        returnBuffer: false,
                        fileName: `${docs.TicketID}.html`
                    });

                    await DB.updateOne({
                        ChannelID: channel.id
                    }, {
                        Closed: true
                    });

                    const MEMBER = guild.members.cache.get(docs.MemberID);
                    const Message = await guild.channels.cache.get(TRANSCRIPTEID).send({
                        embeds: [
                            embed.setAuthor({
                                name: MEMBER.user.tag + " - Ticket",
                                iconURL: MEMBER.displayAvatarURL({
                                    dynamic: true
                                })
                            })
                                .setTitle(`Transcript ticket ID: ${docs.TicketID}`)
                                .setFooter({
                                    text: guild.name + " | Système de ticket",
                                    iconURL: guild.iconURL({
                                        dynamic: true
                                    })
                                }),
                        ],
                        files: [attachement],
                    });

                    interaction.reply({
                        embeds: [embed.setDescription(`Le ticket se fermera dans \`10s\`.\n💾 Le ticket est sauvgarder [TRANSCRIPT](${Message.url})`).setFooter({
                            text: guild.name + " | Système de ticket",
                            iconURL: guild.iconURL({
                                dynamic: true
                            })
                        })]
                    });

                    setTimeout(() => {
                        channel.delete();
                    }, 10 * 1000);
                });
            } else {
                interaction.reply({
                    embeds: [new Discord.MessageEmbed().setDescription(msg_permission_global).setColor(color_red)],
                    ephemeral: true
                });
            }

        } else if (interaction.customId === "accept_event") {
            const embed = new Discord.MessageEmbed().setFooter({
                text: interaction.guild.name + " | Système d'event",
                iconURL: interaction.guild.iconURL({
                    dynamic: true
                })
            }).setTitle("Event").setColor(color_green);
            var author = interaction.member.user.tag;
            var player_id = interaction.member.id;
            var real_author = "> " + author;
            var wait = false;
            let currentEmbed = interaction.message.embeds[0];
            let status = 0
            if (player_ok.find(element => element === "> -") === "> -") {
                status = 1
            } else {
                status = 0
            }

            if (player_ok.find(element => element === real_author) === real_author) {
                player_ok.splice(player_ok.indexOf(real_author), 1);
                if (player_wlist.find(element => element === "> -") === "> -") { } else {
                    if (player_wlist.length === 0) { } else {
                        player_ok.push(player_wlist[0])
                        player_wlist.splice(player_wlist.indexOf(player_wlist[0]), 1);
                        if (player_wlist.length === 0) {
                            player_wlist.push("> -")
                        }
                        list123 = player_wlist.join("\n");
                        list1234 = player_ok.join("\n");
                        currentEmbed.fields.forEach(field => {
                            if (field.name.includes("Liste d'attente")) {
                                field.value = list123;
                            }
                            if (field.name.includes("Accepté")) {
                                field.value = list1234;
                            }
                        })
                    }


                }


                interaction.message.edit({
                    embeds: [currentEmbed]
                });
                if (player_ok.length === 0) {
                    player_ok.push("> -")
                }

                ping_user_event.splice(ping_user_event.indexOf("<@" + player_id + ">"), 1);
                list = player_ok.join("\n")
                currentEmbed.fields.forEach(field => {
                    if (field.name.includes('Accepté')) {
                        if (player_ok.find(element => element === "> -") === "> -") {
                            field.name = "✅ **Accepté (0/" + max + ")**"
                        } else {
                            field.name = "✅ **Accepté (" + player_ok.length + "/" + max + ")**"
                        }
                        field.value = list;
                    }


                });
                interaction.message.edit({
                    embeds: [currentEmbed]
                });
                interaction.reply({
                    embeds: [embed.setDescription(msg_event_remove_user)],
                    ephemeral: true
                });
            } else if (player_ok.length + 1 - status > parseInt(max)) {
                if (player_wlist.find(element => element === real_author) === real_author) {
                    player_wlist.splice(player_wlist.indexOf(real_author), 1);
                    if (player_wlist.length === 0) {
                        player_wlist.push("> -")
                    }
                    list15 = player_wlist.join("\n");
                    currentEmbed.fields.forEach(field => {
                        if (field.name.includes('Liste d\'attente')) {
                            field.value = list15;
                            wait = true;
                        }
                    });
                    interaction.message.edit({
                        embeds: [currentEmbed]
                    });
                    interaction.reply({
                        embeds: [embed.setDescription(msg_event_remove_user)],
                        ephemeral: true
                    });
                } else {
                    if (player_wlist.find(element => element === "> -") === "> -") {
                        player_wlist.splice(player_wlist.indexOf("> -"), 1);
                    }
                    if (player_notok.find(element => element === real_author) === real_author) {
                        player_notok.splice(player_notok.indexOf(real_author), 1);

                    }
                    if (player_wok.find(element => element === real_author) === real_author) {
                        player_wok.splice(player_wok.indexOf(real_author), 1);

                    }
                    if (player_notok.length === 0) {
                        player_notok.push("> -")
                    }
                    if (player_wok.length === 0) {
                        player_wok.push("> -")
                    }

                    player_wlist.push(real_author)
                    list32 = player_wlist.join("\n")
                    list = player_ok.join("\n");
                    list2 = player_notok.join("\n");
                    list3 = player_wok.join("\n");
                    currentEmbed.fields.forEach(field => {
                        if (field.name === "Liste d'attente") {
                            field.value = list32;
                            wait = true;
                        }
                        if (field.name.includes('Accepté')) {
                            if (player_ok.find(element => element === "> -") === "> -") {
                                field.name = "✅ **Accepté (0/" + max + ")**"
                            } else {
                                field.name = "✅ **Accepté (" + player_ok.length + "/" + max + ")**"
                            }
                            field.value = list;
                        }
                        if (field.name.includes('Refusé')) {
                            if (player_notok.find(element => element === "> -") === "> -") {
                                field.name = "❌ **Refusé**"
                            } else {
                                field.name = "❌ **Refusé (" + player_notok.length + ")**"
                            }
                            field.value = list2;
                        }
                        if (field.name.includes('Tentative')) {
                            if (player_wok.find(element => element === "> -") === "> -") {
                                field.name = "❔ **Tentative**"
                            } else {
                                field.name = "❔ **Tentative (" + player_wok.length + ")**"
                            }
                            field.value = list3;
                        }
                    })
                    if (wait === false) {
                        currentEmbed.addField("Liste d'attente", list32, false)
                        list = player_ok.join("\n");
                        list2 = player_notok.join("\n");
                        list3 = player_wok.join("\n");
                        currentEmbed.fields.forEach(field => {
                            if (field.name.includes('Accepté')) {
                                if (player_ok.find(element => element === "> -") === "> -") {
                                    field.name = "✅ **Accepté (0/" + max + ")**"
                                } else {
                                    field.name = "✅ **Accepté (" + player_ok.length + "/" + max + ")**"
                                }
                                field.value = list;
                            }
                            if (field.name.includes('Refusé')) {
                                if (player_notok.find(element => element === "> -") === "> -") {
                                    field.name = "❌ **Refusé**"
                                } else {
                                    field.name = "❌ **Refusé (" + player_notok.length + ")**"
                                }
                                field.value = list2;
                            }
                            if (field.name.includes('Tentative')) {
                                if (player_wok.find(element => element === "> -") === "> -") {
                                    field.name = "❔ **Tentative**"
                                } else {
                                    field.name = "❔ **Tentative (" + player_wok.length + ")**"
                                }
                                field.value = list3;
                            }
                        })
                    }

                    interaction.message.edit({
                        embeds: [currentEmbed]
                    });
                    interaction.reply({
                        embeds: [embed.setDescription(msg_event_full_user).setColor(color_red)],
                        ephemeral: true
                    });
                }
            } else {

                if (player_ok.find(element => element === "> -") === "> -") {
                    player_ok.splice(player_ok.indexOf("> -"), 1);

                }
                if (player_notok.find(element => element === real_author) === real_author) {
                    player_notok.splice(player_notok.indexOf(real_author), 1);

                }
                if (player_wok.find(element => element === real_author) === real_author) {
                    player_wok.splice(player_wok.indexOf(real_author), 1);

                }

                if (player_notok.length === 0) {
                    player_notok.push("> -")
                }
                if (player_wok.length === 0) {
                    player_wok.push("> -")
                }
                if (player_wlist.length === 0) {
                    player_wlist.push("> -")
                }
                ping_user_event.push("<@" + player_id + ">")
                player_ok.push(real_author);
                list = player_ok.join("\n");
                list2 = player_notok.join("\n");
                list3 = player_wok.join("\n");
                currentEmbed.fields.forEach(field => {
                    if (field.name.includes('Accepté')) {
                        if (player_ok.find(element => element === "> -") === "> -") {
                            field.name = "✅ **Accepté (0/" + max + ")**"
                        } else {
                            field.name = "✅ **Accepté (" + player_ok.length + "/" + max + ")**"
                        }
                        field.value = list;
                    }
                    if (field.name.includes('Refusé')) {
                        if (player_notok.find(element => element === "> -") === "> -") {
                            field.name = "❌ **Refusé**"
                        } else {
                            field.name = "❌ **Refusé (" + player_notok.length + ")**"
                        }
                        field.value = list2;
                    }
                    if (field.name.includes('Tentative')) {
                        if (player_wok.find(element => element === "> -") === "> -") {
                            field.name = "❔ **Tentative**"
                        } else {
                            field.name = "❔ **Tentative (" + player_wok.length + ")**"
                        }
                        field.value = list3;
                    }


                });
                interaction.message.edit({
                    embeds: [currentEmbed]
                });
                interaction.reply({
                    embeds: [embed.setDescription(msg_event_add_user_warning)],
                    ephemeral: true
                });

                client.ping = ping_user_event;

            }
        } else if (interaction.customId === "decline_event") {
            const embed = new Discord.MessageEmbed().setFooter({
                text: interaction.guild.name + " | Système d'event",
                iconURL: interaction.guild.iconURL({
                    dynamic: true
                })
            }).setTitle("Event").setColor(color_green);

            var author = interaction.member.user.tag;
            var real_author = "> " + author;
            let currentEmbed = interaction.message.embeds[0];

            if (player_notok.find(element => element === real_author) === real_author) {
                player_notok.splice(player_notok.indexOf(real_author), 1);
                if (player_notok.length === 0) {
                    player_notok.push("> -")
                }
                list = player_notok.join("\n");
                currentEmbed.fields.forEach(field => {
                    if (field.name.includes('Refusé')) {
                        if (player_notok.find(element => element === "> -") === "> -") {
                            field.name = "❌ **Refusé**"
                        } else {
                            field.name = "❌ **Refusé (" + player_notok.length + ")**"
                        }
                        field.value = list;
                    }



                });
                interaction.message.edit({
                    embeds: [currentEmbed]
                });
                interaction.reply({
                    embeds: [embed.setDescription(msg_event_remove_user)],
                    ephemeral: true
                });
            } else {
                if (player_notok.find(element => element === "> -") === "> -") {
                    player_notok.splice(player_notok.indexOf("> -"), 1);
                }
                if (player_ok.find(element => element === real_author) === real_author) {
                    player_ok.splice(player_ok.indexOf(real_author), 1);
                    if (player_wlist.find(element => element === "> -") === "> -") { } else {
                        if (player_wlist.length === 0) { } else {
                            player_ok.push(player_wlist[0])
                            player_wlist.splice(player_wlist.indexOf(player_wlist[0]), 1);
                            if (player_wlist.length === 0) {
                                player_wlist.push("> -")
                            }
                            list123 = player_wlist.join("\n");
                            list1234 = player_ok.join("\n");
                            currentEmbed.fields.forEach(field => {
                                if (field.name.includes("Liste d'attente")) {
                                    field.value = list123;
                                }
                                if (field.name.includes("Accepté")) {
                                    field.value = list1234;
                                }
                            })
                        }
                    }
                }
                if (player_wok.find(element => element === real_author) === real_author) {
                    player_wok.splice(player_wok.indexOf(real_author), 1);

                }
                if (player_wlist.find(element => element === real_author) === real_author) {
                    player_wlist.splice(player_wlist.indexOf(real_author), 1);
                    if (player_wlist.length === 0) {
                        player_wlist.push("> -")
                    }
                    list4 = player_wlist.join("\n");
                    currentEmbed.fields.forEach(field => {
                        if (field.name.includes("Liste d'attente")) {
                            field.value = list4
                        }
                    })

                }
                if (player_ok.length === 0) {
                    player_ok.push("> -")
                }
                if (player_wok.length === 0) {
                    player_wok.push("> -")
                }
                if (player_wlist.length === 0) {
                    player_wlist.push("> -")
                }

                player_notok.push("> " + author);
                list = player_notok.join("\n")
                list2 = player_ok.join("\n")
                list3 = player_wok.join("\n")
                currentEmbed.fields.forEach(field => {
                    if (field.name.includes('Refusé')) {
                        if (player_notok.find(element => element === "> -") === "> -") {
                            field.name = "❌ **Refusé**"
                        } else {
                            field.name = "❌ **Refusé (" + player_notok.length + ")**"
                        }
                        field.value = list;
                    }
                    if (field.name.includes('Accepté')) {
                        if (player_ok.find(element => element === "> -") === "> -") {
                            field.name = "✅ **Accepté (0/" + max + ")**"
                        } else {
                            field.name = "✅ **Accepté (" + player_ok.length + "/" + max + ")**"
                        }
                        field.value = list2;
                    }
                    if (field.name.includes('Tentative')) {
                        if (player_wok.find(element => element === "> -") === "> -") {
                            field.name = "❔ **Tentative**"
                        } else {
                            field.name = "❔ **Tentative (" + player_wok.length + ")**"
                        }
                        field.value = list3;
                    }


                });
                interaction.message.edit({
                    embeds: [currentEmbed]
                });
                interaction.reply({
                    embeds: [embed.setDescription(msg_event_add_user)],
                    ephemeral: true
                });
            }

        } else if (interaction.customId === "tentative_event") {
            const embed = new Discord.MessageEmbed().setFooter({
                text: interaction.guild.name + " | Système d'event",
                iconURL: interaction.guild.iconURL({
                    dynamic: true
                })
            }).setTitle("Event").setColor(color_green);

            var author = interaction.member.user.tag;
            var real_author = "> " + author;
            let currentEmbed = interaction.message.embeds[0];
            if (player_wok.find(element => element === real_author) === real_author) {
                player_wok.splice(player_wok.indexOf(real_author), 1);
                if (player_wok.length === 0) {
                    player_wok.push("> -")
                }
                list = player_wok.join("\n")
                currentEmbed.fields.forEach(field => {
                    if (field.name.includes('Tentative')) {
                        if (player_wok.find(element => element === "> -") === "> -") {
                            field.name = "❔ **Tentative**"
                        } else {
                            field.name = "❔ **Tentative (" + player_wok.length + ")**"
                        }
                        field.value = list;
                    }


                });
                interaction.message.edit({
                    embeds: [currentEmbed]
                });
                interaction.reply({
                    embeds: [embed.setDescription(msg_event_remove_user)],
                    ephemeral: true
                });
            } else {
                if (player_wok.find(element => element === "> -") === "> -") {
                    player_wok.splice(player_wok.indexOf("> -"), 1);
                }
                if (player_notok.find(element => element === real_author) === real_author) {
                    player_notok.splice(player_notok.indexOf(real_author), 1);

                }
                if (player_ok.find(element => element === real_author) === real_author) {
                    player_ok.splice(player_ok.indexOf(real_author), 1);
                    if (player_wlist.find(element => element === "> -") === "> -") { } else {
                        if (player_wlist.length === 0) { } else {
                            player_ok.push(player_wlist[0])
                            player_wlist.splice(player_wlist.indexOf(player_wlist[0]), 1);
                            if (player_wlist.length === 0) {
                                player_wlist.push("> -")
                            }
                            list123 = player_wlist.join("\n");
                            list1234 = player_ok.join("\n");
                            currentEmbed.fields.forEach(field => {
                                if (field.name.includes("Liste d'attente")) {
                                    field.value = list123;
                                }
                                if (field.name.includes("Accepté")) {
                                    field.value = list1234;
                                }
                            })
                        }
                    }
                }
                if (player_wlist.find(element => element === real_author) === real_author) {
                    player_wlist.splice(player_wlist.indexOf(real_author), 1);
                    if (player_wlist.length === 0) {
                        player_wlist.push("> -")
                    }
                    list4 = player_wlist.join("\n");
                    currentEmbed.fields.forEach(field => {
                        if (field.name.includes("Liste d'attente")) {
                            field.value = list4
                        }
                    })

                }
                if (player_ok.length === 0) {
                    player_ok.push("> -")
                }
                if (player_notok.length === 0) {
                    player_notok.push("> -")
                }
                if (player_wlist.length === 0) {
                    player_wlist.push("> -")
                }
                player_wok.push("> " + author);
                list = player_wok.join("\n")
                list2 = player_ok.join("\n")
                list3 = player_notok.join("\n")
                currentEmbed.fields.forEach(field => {
                    if (field.name.includes('Tentative')) {
                        if (player_wok.find(element => element === "> -") === "> -") {
                            field.name = "❔ **Tentative**"
                        } else {
                            field.name = "❔ **Tentative (" + player_wok.length + ")**"
                        }
                        field.value = list;
                    }
                    if (field.name.includes('Refusé')) {
                        if (player_notok.find(element => element === "> -") === "> -") {
                            field.name = "❌ **Refusé**"
                        } else {
                            field.name = "❌ **Refusé (" + player_notok.length + ")**"
                        }
                        field.value = list3;
                    }
                    if (field.name.includes('Accepté')) {
                        if (player_ok.find(element => element === "> -") === "> -") {
                            field.name = "✅ **Accepté**"
                        } else {
                            field.name = "✅ **Accepté (" + player_ok.length + ")**"
                        }
                        field.value = list2;
                    }


                });
                interaction.message.edit({
                    embeds: [currentEmbed]
                });
                interaction.reply({
                    embeds: [embed.setDescription(msg_event_add_user)],
                    ephemeral: true
                });
            }
        } else if (interaction.customId === 'edit_event') {
            if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
                const embed = new Discord.MessageEmbed().setColor("f7b723").setFooter({
                    text: "Pour quitter, tapez 'cancel'."
                })
                let currentEmbed = interaction.message.embeds[0];
                currentEmbed.fields.forEach((field => {
                    if (field.name.includes("Heure")) value = field.value
                }))
                const modid_emebed = new Discord.MessageEmbed()
                    .setTitle("Que voudrais-tu modifier ?")
                    .addField("1 - Titre", "```" + currentEmbed.title + "```", false)
                    .addField("2 - Description", "```" + currentEmbed.description + "```", false)
                    .addField("# - Date **En développement**", "```" + value + "```", true)
                    .addField("4 - Nombre maximum de participants", "```" + max + "```", true)
                    .addField("5 - Image", "```" + currentEmbed.image + "```", false)
                    .setColor("0xffd91a")
                    .setFooter({
                        text: "Pour quitter, tapez 'cancel'."
                    })
                const msg = await interaction.member.send({
                    embeds: [modid_emebed]
                })
                interaction.reply({
                    embeds: [new Discord.MessageEmbed().setTitle('Modification d\'événements !').setDescription(`Je t'ai envoyé un [message direct](${msg.url}) avec les prochaines étapes.`).setColor("f7b723")],
                    ephemeral: true
                });

                try {


                    const collected = await msg.channel.awaitMessages({
                        max: 1,
                        time: 180000,
                        errors: ['time']
                    });
                    number = collected.first().content;
                    if (number === 'cancel') return interaction.member.send({
                        embeds: [new Discord.MessageEmbed().setTitle("Modification annuler ✅").setColor(color_green)]
                    });

                    if (number === "1") {
                        const msg1 = await interaction.member.send({
                            embeds: [embed.setTitle('Entrez le titre de l\'événement').setDescription("Jusqu'à 200 caractères sont autorisés")]
                        });
                        const collected1 = await msg1.channel.awaitMessages({
                            max: 1,
                            time: 180000,
                            errors: ['time']
                        });
                        name_event = collected1.first().content;
                        if (name_event === 'cancel') return interaction.member.send({
                            embeds: [new Discord.MessageEmbed().setTitle("Modification annuler ✅").setColor(color_green)]
                        });
                        if (name_event.length > 200) return interaction.member.send({
                            embeds: [new Discord.MessageEmbed().setColor(color_red).setTitle("Trop de caractère - Event annulé")]
                        });

                        currentEmbed.setTitle(name_event)
                        const edit = await interaction.message.edit({
                            embeds: [currentEmbed]
                        });
                        interaction.member.send({
                            embeds: [embed.setTitle("L'événement a été mis à jour !").setDescription(`[Cliquez ici pour voir l'événement](${edit.url})`)]
                        });

                    } else if (number === "2") {
                        const msg2 = await interaction.member.send({
                            embeds: [embed.setTitle('Entrez la description de l\'événement').setDescription("Jusqu'à 1600 caractères sont autorisés.")]
                        });
                        const collected2 = await msg2.channel.awaitMessages({
                            max: 1,
                            time: 180000
                        });
                        description_event = collected2.first().content;
                        if (description_event === 'cancel') return interaction.member.send({
                            embeds: [new Discord.MessageEmbed().setTitle("Modification annuler ✅").setColor(color_green)]
                        });
                        if (description_event.length > 1600) return interaction.member.send({
                            embeds: [new Discord.MessageEmbed().setColor(color_red).setTitle("Trop de caractère - Modification annuler")]
                        });

                        currentEmbed.setDescription(description_event);
                        const edit = await interaction.message.edit({
                            embeds: [currentEmbed]
                        });
                        interaction.member.send({
                            embeds: [embed.setTitle("L'événement a été mis à jour !").setDescription(`[Cliquez ici pour voir l'événement](${edit.url})`)]
                        });
                    }
                    //else if (number === "3") {

                    //const msg3 = await interaction.member.send({ embeds: [embed.setTitle("Quand l'événement doit-il commencer ?").setDescription("> YYYY-MM-DD HH:MM:SS")] });
                    //const collected3 = await msg3.channel.awaitMessages({ max: 1, time: 10000 * 60 * 3 });
                    //when = collected3.first().content;
                    //if (when === 'cancel') return interaction.member.send({ embeds: [new Discord.MessageEmbed().setTitle("Modification annuler ✅").setColor(color_green)] });

                    //const msg4 = await interaction.member.send({ embeds: [embed.setTitle("Quelle est la durée de cet événement ?").setDescription("> 2h\n> 45m")] });
                    //const collected4 = await msg4.channel.awaitMessages({ max: 1, time: 10000 * 60 * 3 });
                    //duration = collected4.first().content;
                    //if (duration === 'cancel') return interaction.member.send({ embeds: [new Discord.MessageEmbed().setTitle("Modification annuler ✅").setColor(color_green)] });

                    //currentEmbed.fields.forEach((field => { if (field.name.includes("Heure")) field.value = "**Date**: " + when + "\n" + "**Pendant**: " + duration }))
                    //const edit = await interaction.message.edit({ embeds: [currentEmbed] });
                    //interaction.member.send({ embeds: [embed.setTitle("L'événement a été mis à jour !").setDescription(`[Cliquez ici pour voir l'événement](${edit.url})`)] });
                    //}
                    else if (number === '4') {
                        const msg6 = await interaction.member.send({
                            embeds: [embed.setTitle("Entrez le nombre maximum de participants").setDescription("Jusqu'à 250 participants sont autorisés.")]
                        });
                        const collected6 = await msg6.channel.awaitMessages({
                            max: 1,
                            time: 180000
                        });
                        max_player = collected6.first().content;
                        if (max_player === 'cancel') return interaction.member.send({
                            embeds: [new Discord.MessageEmbed().setTitle("Modification annuler ✅").setColor(color_green)]
                        });

                        max = max_player;
                        if (player_ok.length === 0) {
                            player_ok.push("> -")
                        }
                        list2 = player_ok.join("\n")
                        currentEmbed.fields.forEach(field => {
                            if (field.name.includes('Accepté')) {
                                if (player_ok.find(element => element === "> -") === "> -") {
                                    field.name = "✅ **Accepté (0/" + max + ")**"
                                    field.value = list2;
                                } else {
                                    field.name = "✅ **Accepté (" + player_ok.length + "/" + max + ")**"
                                }
                                field.value = list2;
                            }
                        })

                        const edit = await interaction.message.edit({
                            embeds: [currentEmbed]
                        });
                        interaction.member.send({
                            embeds: [embed.setTitle("L'événement a été mis à jour !").setDescription(`[Cliquez ici pour voir l'événement](${edit.url})`)]
                        });

                    } else if (number === "5") {
                        const msg5 = await interaction.member.send({
                            embeds: [embed.setTitle("URL de l'image pour la vignette ?").setDescription("Tapez `none` pour ne pas avoir d'image\n⚠️ Lien **direct** vers l'image.")]
                        });
                        const collected5 = await msg5.channel.awaitMessages({
                            max: 1,
                            time: 180000
                        });
                        image = collected5.first().content;
                        if (image === 'cancel') return interaction.member.send({
                            embeds: [new MessageEmbed().setTitle("Modification annuler ✅").setColor(color_green).set]
                        });

                        if (image === "none") {
                            currentEmbed.setImage(null);
                            const edit = await interaction.message.edit({
                                embeds: [currentEmbed]
                            });
                            interaction.member.send({
                                embeds: [embed.setTitle("L'événement a été mis à jour !").setDescription(`[Cliquez ici pour voir l'événement](${edit.url})`)]
                            });
                        } else {
                            if (image.includes("https://")) {
                                currentEmbed.setImage(image)
                                const edit = await interaction.message.edit({
                                    embeds: [currentEmbed]
                                });
                                interaction.member.send({
                                    embeds: [embed.setTitle("L'événement a été mis à jour !").setDescription(`[Cliquez ici pour voir l'événement](${edit.url})`)]
                                });
                            } else {
                                interaction.member.send({
                                    content: "❌ Erreur avec l'image"
                                })
                            }
                        }
                    } else {
                        interaction.member.send({
                            embeds: [new Discord.MessageEmbed().setTitle("❌ Aucun numéro correspondant veuillez recommencer.").setColor(color_red)]
                        })
                    }
                } catch (err) {
                    interaction.member.send({
                        embeds: [embed.setTitle("Timeout ⏳").setDescription("Erreur : " + err)]
                    });
                    interaction.member.send("erreur : " + err)
                };
            } else {
                interaction.reply({
                    embeds: [new Discord.MessageEmbed().setDescription(msg_permission_global).setColor(color_red)],
                    ephemeral: true
                });
            }

        } else if (interaction.customId === "delete_event") {
            if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
                interaction.message.delete()
                interaction.reply({
                    embeds: [new Discord.MessageEmbed().setDescription(msg_successfully_deleted).setColor(color_green)],
                    ephemeral: true
                });
            } else {
                interaction.reply({
                    embeds: [new Discord.MessageEmbed().setDescription(msg_permission_global).setColor(color_red)],
                    ephemeral: true
                });
            }
        }
    }
});

//----------------------------------------------------------------

module.exports = client;
client.login(token);