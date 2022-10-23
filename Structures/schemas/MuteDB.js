const {model , Schema} = require("mongoose");

module.exports = model("mute", new Schema({
    Guild: String,
    Users: Array
}))