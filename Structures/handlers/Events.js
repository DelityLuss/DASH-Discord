const { Events } = require('../validation/EventNames');
const { promisify } = require('util');
const { glob } = require('glob');
const PG = promisify(glob);
const Ascii = require('ascii-table');


module.exports = async (client) => {

    const Table = new Ascii("Event loaded");
    (await PG(`${process.cwd()}/Events/*/*.js`)).map(async (file) => {
        const event = require(file);

        if (!Events.includes(event.name || !event.name)) {
            const L = file.split('/');
            Table.addRow(`${event.name || 'MISSING'}`, `⛔ Event name is eithier invalid or missing: ${L[6] + "/" + L[7]}`);
            return;
        }
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        }
        else {
            client.once(event.name, (...args) => event.execute(...args, client));
        }
        Table.addRow(event.name, "✅ successfully loaded");
    });
    console.log(Table.toString());

}
