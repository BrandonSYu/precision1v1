import React from 'react';
import styled from 'styled-components';

const TargetTwo = styled.div`
    color : yellow;
    font-size : 30px;
`;

class TargetP2 extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            alive : true,
            id : null,
            x : 0,
            y : 0
        }
        this.targetClick = this.targetClick.bind(this);
    }
    componentDidMount(){
        this.setState({id : this.props.id, x : this.props.x, y : this.props.y})
    }
    targetClick(){
        // console.log("Delete Blue target from this client")
        this.setState({alive : false});
        console.log(this.props.id)
        this.props.handleClickBlue(this.props.id);
    }
    render(){
        return(
            <div>
                {this.state.id ?
                <TargetTwo style = {{position : "absolute", left : `${this.state["x"] + "px"}`, bottom : `${this.state["y"]+ "px"}`}} onClick = {()=>this.targetClick()} className="fas fa-coins" />
                :<div></div>}
                            {!this.state.alive ?
                            <Sound url="coin.mp3"
                            autoLoad = {true}
                            playStatus={Sound.status.PLAYING}
                            playFromPosition={10 /* in milliseconds */}
                            onLoading={this.handleSongLoading}
                            onPlaying={this.handleSongPlaying}
                            onFinishedPlaying={this.handleSongFinishedPlaying}/>
        : <div/>}
            </div>
        )
    }
}

export default TargetP2;