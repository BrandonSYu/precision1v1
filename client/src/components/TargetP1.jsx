import React from 'react';
import styled from 'styled-components';

const TargetOne = styled.div`
    color : red;
    font-size : 50px;
`;
class TargetP1 extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            alive : true,
        }
        this.targetClick = this.targetClick.bind(this);
    }
    targetClick(){
        this.setState({alive : false});
        this.props.handleClickRed();
    }
    render(){
        return(
            <div>
                <TargetOne onClick = {()=>this.targetClick()} className="fas fa-bullseye" />
            </div>
        )
    }
}

export default TargetP1;