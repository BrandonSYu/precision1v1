#!/usr/bin/env node
const path = require('path');
var socket = require('socket.io');
var express = require('express');
var app = express();
var server = app.listen(5000, function(){
    console.log((new Date()) + ' Server is listening on port 5000');
})
app.use(express.static(__dirname + '/../client/dist'));
app.get('/wiimenu.mp3', function(req, res){
    console.log('GOT SOUND')
    res.sendFile(path.resolve(__dirname, './wiimenu.mp3'));
})
app.get('/coin.mp3', function(req, res){
    console.log('GOT COIN SOUND')
    res.sendFile(path.resolve(__dirname, './coin.mp3'));
})
app.get('/supermario2.png', function(req, res){
    console.log('GOT Pic')
    res.sendFile(path.resolve(__dirname, './supermario2.png'));
})

var socketArr = []
// var seedRed = {0 : [10, 20], 1 : [5, 6], 2 : [99, 50]};
// var seedBlue = {0 : [10, 50], 1 : [50, 6], 2 : [990, 50]};
var scoreOne = 0;
var scoreTwo = 0;
var timer = 59;
var io = socket(server);
io.on('connection', function(socket){
    console.log('Socket Connection ' + socket.id)
    socketArr.push(socket.id);
    // Handle chat event
    console.log('NEW PLAYER ADDED ' + socketArr);

    socket.on('chat', function(data){
        console.log(data);
        io.sockets.emit('chat', data);
        console.log('Message Recieved emitting a chat event to all sockets')
    });
    socket.on('typing', function(data){
        console.log("FROM SERVER typing data " + JSON.stringify(data)); 
        socket.broadcast.emit('typing', data);
        console.log('Displaying handler typing')
    })
    socket.on('start', function(data){
        console.log('FROM SERVER: GAME START');
        // data.seedRed = seedRed;
        // data.seedBlue = seedBlue;
        // var startInt = setInterval(()=>{
        //     io.sockets.emit('start', data);
        // },500)
        // if(scoreOne === 5){
        //     clearInterval(startInt);
        // }
        data.timer = timer;
        io.sockets.emit('start', data);
    })

    socket.on('targetclickred', function(data){
        console.log("DATA from socket server " + JSON.stringify(data));
        if(data.sessionId === socketArr[0]){
            console.log("PlayerOne clicked a red target, SCORE");
            scoreOne += 1;
            data.scoreOne = scoreOne;
        } else if(data.sessionId === socketArr[1]){
            console.log("PlayerTwo clicked a red target, MINUS SCORE");
            scoreOne -= 1;
            data.scoreOne = scoreOne;
        }
        data.scoreTwo = scoreTwo;
        io.sockets.emit('targetclickred', data);
        console.log("From Server: Target Red has been clicked");
        console.log('Score1: ' + scoreOne + " Score2: " + scoreTwo);
    })

    socket.on('targetclickblue', function(data){
        console.log("DATA from socket server " + JSON.stringify(data));
        if(data.sessionId === socketArr[1]){
            console.log("PlayerTwo clicked a blue target, SCORE");
            scoreTwo += 1;
            data.scoreTwo = scoreTwo;
        } else if(data.sessionId === socketArr[0]){
            console.log("PlayerOne clicked a blue target, MINUS SCORE");
            scoreTwo -= 1;
            data.scoreTwo = scoreTwo;
        }
        data.scoreOne = scoreOne;
        io.sockets.emit('targetclickblue', data);
        console.log("From Server: Target Blue has been clicked");
        console.log('Score1: ' + scoreOne + " Score2: " + scoreTwo);
    })
    
})

 