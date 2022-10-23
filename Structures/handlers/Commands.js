const { Perms } = require('../validation/permissions');
const { Client } = require('discord.js');
const { promisify } = require('util');
const { glob } = require('glob');
const PG = promisify(glob);
const Ascii = require('ascii-table');
const { SlashCommandBuilder } = require("@discordjs/builders");

const { server_id } = require('../config.json')

/**
 * @param {Client} client
 */

module.exports = async (client) => {
    const Table = new Ascii("Command Loaded");

    var CommandsArray = [];

    (await PG(`${process.cwd()}/commands/*/*.js`)).map(async (file) => {
        const command = require(file);

        if (!command.name) {
            return Table.addRow(file.split("/")[7], "🔸 FAILED", "Missing a name.");
        }
        if (!command.description) {
            return Table.addRow(file.split("/")[7], "🔸 FAILED", "Missing a description.");
        }
        if (command.permissions) {
            if (Perms.includes(command.permissions)) {
                command.defaultPermision = false;
            }
            else {
                return Table.addRow(command.name, "🔸 FAILED", "Permission is invalid");
            }
        }
        client.commands.set(command.name, command);
        CommandsArray.push(command);

        Table.addRow(command.name, "🔹 SUCCESSFUL");
    });
    console.log(Table.toString());

    client.on("ready", async () => {
        const MainGuild = client.application;

        MainGuild.commands.set(CommandsArray).then(async (command) => {
            const Roles = (commandName) => {
                const cmdPerms = CommandsArray.find((c) => c.name === commandName).permission;
                if (!cmdPerms) return null;

                return MainGuild.roles.cache.filter((r) => r.permissions.has(cmdPerms));
            }

            const fullPermissions = command.reduce((acumulator, r) => {
                const roles = Roles(r.name);
                if (!roles) return acumulator;


                const permissions = roles.reduce((a, r) => {
                    return [...a, { id: r.id, type: "ROLE", permissions: true }]
                }, []);
                return [...acumulator, { id: r.id, permissions }]
            }, []);
            //await MainGuild.commands.permissions.set({ fullPermissions });

        });

        // await client.guilds.cache.get("749690817056211017").commands.fetch()
        // console.log(client.guilds.cache.get("749690817056211017").commands.cache);

        // client.guilds.cache.get("749690817056211017").commands.cache.map(command => {command.delete();})
        // console.log(client.guilds.cache.get("749690817056211017").commands.cache);

    });

}