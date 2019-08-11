import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
// var socket = io.connect('http://localhost:5000');
// const sessionId = socketConnection.socket.sessionid; //
var sessionId;
var socket = io.connect('http://localhost:5000');
socket.on('connect', function() {
    console.log(socket)
    // socket.io.engine.id = 1
    sessionId = socket.io.engine.id
    console.log(sessionId)
    ReactDOM.render(<App sessionId={sessionId} socket={socket}/>, document.getElementById('app'));
});
// Query DOM

socket.on('chat', function(data){
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', function(data){
    feedback.innerHTML += '<p><em>' + data + ' is typing a messsage...</em></p>';
});
socket.on('targetclickred', function(data){
    console.log("DATA from SocketListener on Red" + JSON.stringify(data));
    scoreOne.innerHTML = data.scoreOne;
    scoreTwo.innerHTML = data.scoreTwo;
})
socket.on('targetclickblue', function(data){
    console.log("DATA from SocketListener on Blue" + JSON.stringify(data));
})