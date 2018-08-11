const mongoose = require("mongoose");
const io = require("socket.io");
const Room = require("./../models/room");

mongoose.connect(process.env.MONGO_SERV);

module.exports.createRoom = function(roomName, callBack){
    var newRoom = new Room({
        name: roomName
    });
    newRoom.save(callBack);
};

module.exports.retrieveMessages = function(roomName, callBack){
    Room.find({name: roomName}, function(err, room){
        if(!err){
            callBack(room.messages);
        }
    });
};

var addMessage = function(roomName, message, callBack){
    Room.findOneAndUpdate({
        name: roomName
    },{
        $push: {
            messages : message
        }
    },{
        safe: true,
        upsert: true
    },function(err, model){
        console.log(err);
    });
};

module.exports.createSocket = function(io, roomName){
    var socketNameSpace = io.of('/' + roomName);
    socketNameSpace.on('connection', function(socket){
        socket.on("chat", function(data){
            socketNameSpace.emit('msg', data);
            addMessage(roomName, data, function(error, success){
                //Do nothing
            });
        });
    });
}