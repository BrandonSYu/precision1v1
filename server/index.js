#!/usr/bin/env node
// var WebSocketServer = require('websocket').server;
var socket = require('socket.io');
// var http = require('http');
var express = require('express');
var app = express();
var server = app.listen(5000, function(){
    console.log((new Date()) + ' Server is listening on port 5000');
})
app.use(express.static(__dirname + '/../client/dist'));
// var server = http.createServer(function(request, response) {
//     console.log((new Date()) + ' Received request for ' + request.url);
//     response.writeHead(404);
//     response.end();
// });
// server.listen(8080, function() {
//     console.log((new Date()) + ' Server is listening on port 8080');
// });
var socketArr = []
var scoreOne = 0;
var scoreTwo = 0;
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
    // socket.on('typing', function(data){
    //     socket.broadcast.emit('typing', data);
    //     console.log('Displaying handler typing')
    // })
    socket.on('targetclickred', function(data){
        console.log("DATA from socket server " + JSON.stringify(data));
        if(data.sessionId === socketArr[0]){
            console.log("PlayerOne clicked a red target, SCORE");
            scoreOne += 1;
            data.scoreOne = data.scoreOne+1;
        } else if(data.sessionId === socketArr[1]){
            console.log("PlayerTwo clicked a red target, MINUS SCORE");
            data.scoreOne = data.scoreOne--;
            scoreOne -= 1;
        }
        console.log(scoreOne);
        io.sockets.emit('targetclickred', data);
        console.log("From Server: Target Red has been clicked");
    })
    socket.on('targetclickblue', function(data){
        console.log("DATA from socket server " + data);
        io.sockets.emit('targetclickblue', data);
        console.log("From Server: Target Blue has been clicked");
    })
})

 