import React from 'react';
import TargetP1 from './TargetP1.jsx';
import styled from 'styled-components';

const GameBox = styled.div`
    border-style: solid;
    border-width: medium;
    height : 750px;
`;

class Game extends React.Component{//timelimit, difficulty factor, speed
    constructor(props){
        super(props);
        this.state = {
            socket : null,
            started : false,
            scoreOne : 0,
            scoreTwo : 0,
            timeLimit : 30,
            sessionId : null,
        }
        this.handleStart = this.handleStart.bind(this);
        this.handleClickRed = this.handleClickRed.bind(this);
        this.handleClickBlue = this.handleClickBlue.bind(this);
    }
    componentDidMount(){
        console.log(this.props.sessionId);
        this.setState({socket : this.props.socket, sessionId : this.props.sessionId});
        // if(!this.state.playerOne){
        //     this.setState({playerOne : this.props.socket.id});
        //     console.log('Player One Set ' + this.props.socket.id)
        // } else if(!this.state.playerTwo){
        //     this.setState({playerTwo : this.props.socket.id});
        //     console.log('Player Two Set ' + this.props.socket.id)
        // }else{
        //     return;
        // }
    }
    handleStart(){//spawn random targets of both color, start timer countdown, 
        this.setState({started : true});
    }
    handleClickRed(){
        console.log('Client: RED TARGET HAS BEEN CLICKED')
        console.log(this.state.sessionId);
        this.state.socket.emit('targetclickred', {
            sessionId : this.state.sessionId,
            scoreOne : this.state.scoreOne,
            scoreTwo : this.state.scoreTwo
        })
        // this.setState({scoreOne : this.state.scoreOne+1})
    }
    handleClickBlue(){
        console.log('Client: Blue TARGET HAS BEEN CLICKED')
        // this.setState({scoreTwo : this.state.scoreTwo+1})
        console.log(this.state.sessionId);
        this.state.socket.emit('targetclickblue', {
            sessionId : this.state.sessionId,
            scoreOne : this.state.scoreOne,
            scoreTwo : this.state.scoreTwo
        })
        // this.setState({scoreOne : this.state.scoreOne+1})
    }
    random(){

    }
    render(){
        return(
            <div>
                <GameBox>
                <div>Game Box Here</div>
                <div>Player1 Score: </div>
                <div id="scoreOne">{this.state.scoreOne}</div>
                <div>Player2 Score: </div>
                <div id="scoreTwo">{this.state.scoreTwo}</div>
                <button onClick={()=>this.handleStart()}>START</button>
                <TargetP1 handleClickRed = {()=>this.handleClickRed()}/>
                </GameBox>
            </div>
        )
    }
}
export default Game;