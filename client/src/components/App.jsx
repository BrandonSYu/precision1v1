import React from 'react';
import Game from './Game.jsx';
import Chat from './Chat.jsx';
import styled from 'styled-components';

const AppBox = styled.div`

`;
class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            sessionId : null,
            socket : null,
        };
    }
    componentDidMount(){
        // var socket = io.connect('http://localhost:5000');
        this.setState({sessionId : this.props.sessionId, socket : this.props.socket});
        console.log('Socket Created');
    }
    render(){
        return(
            <div>
            {this.state.socket ? 
                <AppBox>
                    <div>
                        <Game sessionId = {this.state.sessionId} socket={this.state.socket}/>
                    </div>
                    <div>
                        <Chat sessionId = {this.state.sessionId} socket={this.state.socket}/>
                    </div>
                </AppBox>
    : <div></div>}
    </div>
        )
    }
}

export default App;