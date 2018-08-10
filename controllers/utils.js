const mongoose = require("mongoose");
const Room = require("./../models/room");

module.exports.createRoom = function(roomName, callBack){
    var newRoom = new Room({
        name: roomName
    });
    newRoom.save(callBack);
};

module.exports.addMessage = function(roomName, userName, messageContent, callBack){
    Room.findOneAndUpdate({
        name: roomName
    }, 
    {
        $push: {
            from: userName,
            content: messageContent
        }
    }, callBack);
};

module.exports.retrieveMessages = function(roomName, callBack){
    Room.find({name: roomName}, function(err, room){
        if(!err){
            callBack(room.messages);
        }
    });
};