const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_SERV_EBCA);

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

var Room = mongoose.model('Room', roomSchema);

module.exports = Room;
