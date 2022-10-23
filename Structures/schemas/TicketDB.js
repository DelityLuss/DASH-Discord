const {model , Schema} = require("mongoose");


module.exports = model(
    "Tickets",
    new Schema({
        GuilID: String,
        MemberID: String,
        ChannelID: String,
        TicketID: String,
        Closed: Boolean,
        Locked: Boolean,
    })
)