const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_SERV);

var roomSchema = mongoose.Schema({
    name:{
        type: String
    },
    messages: [{
        from:{
            type: String
        },
        content:{
            type: String
        }
    }]
});

var Room = mongoose.models('Room', roomSchema);

module.exports = Room;