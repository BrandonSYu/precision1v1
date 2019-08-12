import React from 'react';
import TargetP1 from './TargetP1.jsx';
import TargetP2 from './TargetP2.jsx';
import styled from 'styled-components';

const Box = styled.div`
    display:flex;
    flex-direction : column;
    z-index : 5;
    background-color : white;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
`;

class TargetBox extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            redTargetList : [{0 : [10, 20]}, {1 : [5, 6]}, {2 : [99, 50]}],
            blueTargetList : [{0 : [10, 20]}, {1 : [5, 6]}, {2 : [99, 50]}],
        }
}

render(){
    return(
        <div>
    <Box>
        {/* <TargetP1 socket={this.props.socket} handleClickRed={this.props.handleClickRed} id={1} x={1} y={2}/> */}
        {/* {names.map((name) => (
            <TargetP1 handleClickRed={props.handleClickRed} id={1} x={1} y={2} />
        ))} */}
        {this.state.redTargetList.map((item) => <div id={"redTarget" + Object.keys(item)[0].toString()}><TargetP1 socket={this.props.socket} handleClickRed={this.props.handleClickRed} id={Object.keys(item)[0]} x={Object.values(item)[0]} y = {Object.values(item)[1]}/></div>)}
        {this.state.blueTargetList.map((item) => <div id= {"blueTarget" +  Object.keys(item)[0].toString()}><TargetP2 socket={this.props.socket} handleClickBlue={this.props.handleClickBlue} id={Object.keys(item)[0]} x={Object.values(item)[0]} y = {Object.values(item)[1]}/></div>)}

    </Box>

        </div>
    )
}
}

export default TargetBox;