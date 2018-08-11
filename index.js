require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const socket = require("socket.io");
const Room = require("./models/room");
const utils = require("./controllers/utils");

mongoose.connect(process.env.MONGO_SERV);

var app = express();
var server = app.listen(process.env.PORT || 3000);

const io = require('socket.io')(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.use('/public', express.static('public'));

app.get('/', function(request, response){
    response.sendFile(__dirname + '/views/handle.html');
});

app.get('/home',  function(request, response){
    response.sendFile(__dirname + '/views/index.html');
});

app.get('/createroom', function(request, response){
    response.sendFile(__dirname + '/views/createroom.html');
});

app.post('/createroom', function(request, response){
    var roomName = request.body.roomName;
    Room.findOne({name: roomName}, function(err, room){
        if(err){
            response.json({error: "errorCreating"});
        }else if(!room){
            utils.createRoom(roomName, function(err){
                if(err){
                    response.json({error: "errorCreating"});
                }else{
                    response.json({error: "noErr"});
                    utils.createSocket(io, roomName);
                }
            });
        }else{
            response.json({error: "alreadyExists"});
        }
    });
});

app.get('/joinroom', function(request, response){
    Room.find({}, function(err, rooms){
        if(err){
            throw err;
        }else{
            response.render('joinroom', {rooms});
        }
    })
});

app.get('/noroom', function(request, response){
    response.sendFile(__dirname + '/views/noroom.html');
});

app.get('/:roomName',  function(request, response){
    var roomName = request.params.roomName;
    //console.log(roomName);
    Room.findOne({name: roomName}, function(err, room){
        if(err){
            response.redirect('/');
        }else if(room == null){
            response.redirect('/noroom');
        }else{
            response.render('room', {room});
        }
    });
});