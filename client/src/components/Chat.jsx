import React from 'react';

class Chat extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            socket : null,
        };
        this.handleSend = this.handleSend.bind(this);
        this.handleKey = this.handleKey.bind(this);
    }
    componentDidMount(){
        this.setState({socket : this.props.socket})
    }
    handleSend(){
        console.log("sending")
        var message = document.getElementById('message'),
        handle = document.getElementById('handle');
    //   output = document.getElementById('output');


// Emit events

    this.state.socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.value = "";
    console.log('Message sent from client')

    }
    handleKey(){
        console.log('KEYPRESS from CHAT client')
        var handle = document.getElementById('handle');
        this.state.socket.emit('typing', handle.value);
    }
    
    render(){
        return(
            <div>
            <div id="mario-chat">
            <h2>Precision Chat</h2>
            <div id="chat-window">
                <div id="output"></div>
                <div id="feedback"></div>
            </div>
            <input id="handle" type="text" placeholder="Handle" />
            <input id="message" type="text" placeholder="Message" onChange = {()=>this.handleKey()}/>
            <button id="send" onClick={() => this.handleSend()}>Send</button>
        </div>
            </div>
        )
    }
}

export default Chat;