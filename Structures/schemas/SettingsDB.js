const {model , Schema} = require("mongoose");

module.exports = model("settings", new Schema({
    GuildID: String,
    add: Boolean,
    everyone: Boolean,
    link: Boolean,
    spam: Boolean,
    selfbot: Boolean,
    
}))