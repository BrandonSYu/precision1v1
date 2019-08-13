import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
// var socket = io.connect('http://localhost:5000');
// const sessionId = socketConnection.socket.sessionid; //
var sessionId;
var socket = io.connect('18.191.255.112:5000');
socket.on('connect', function() {
    console.log(socket)
    // socket.io.engine.id = 1
    sessionId = socket.io.engine.id
    console.log(sessionId)
    ReactDOM.render(<App sessionId={sessionId} socket={socket}/>, document.getElementById('app'));
});
// Query DOM

socket.on('start', function(data){
    console.log('GAME START from SocketListener' + JSON.stringify(data));
    
})
