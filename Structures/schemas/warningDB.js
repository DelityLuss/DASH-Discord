const {model , Schema} = require("mongoose");

module.exports = model("WarnDB", new Schema({
    GuildID: String,
    UserID: String,
    UserTag: String,
    Content: Array,
}))