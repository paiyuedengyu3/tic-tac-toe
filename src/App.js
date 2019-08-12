import React, {Component} from "react";
import "./App.css";

class App extends Component{
    constructor(){
        super();
        this.state={
            whosturn: 1,
            board: new Array(9).fill(0),
            boardClickable: new Array(9).fill(true),
            actions: [],
            gameover: false,
            winner: ""
        };
        this.handlePlay = this.handlePlay.bind(this);
        this.handleRewind = this.handleRewind.bind(this);
        this.gameOver = this.gameOver.bind(this);
    }
    
    handlePlay(pos){
        if (this.state.boardClickable[pos]) {
            this.setState({
                board: [
                    ...this.state.board.slice(0, pos),
                    this.state.whosturn,
                    ...this.state.board.slice(pos + 1, 9)
                ],
                boardClickable: [
                    ...this.state.boardClickable.slice(0, pos),
                    false,
                    ...this.state.boardClickable.slice(pos + 1, 9)
                ],
                whosturn: 3 - this.state.whosturn,
                actions: [
                    ...this.state.actions, 
                    {
                        whosturn: this.state.whosturn,
                        board: this.state.board,
                        boardClickable: this.state.boardClickable,
                        gameover: this.state.gameover,
                        winner: this.state.winner
                    }
                ]
            },()=>{this.gameOver(this.state.whosturn)});
        }
        
    }
    handleRewind(index){
        this.setState({
            actions: this.state.actions.slice(0,index),
            ...this.state.actions[index],
        });
    }
    gameOver(player){
        let count = 0;
        let win = false;
        let potentialWinner = 3 - player;
        const winPattern = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];
        const playerMoves = [];
        for (let i = 0; i < 9; i++) {
            if (this.state.board[i] === potentialWinner) {
                playerMoves.push(i);
            }
        }
        for (let i = 0; i < 8; i++) {
            count = 0;
            for (let j = 0; j < 3; j++) {
                if (playerMoves.includes(winPattern[i][j])){
                    count++;
                }
            }
            if (count === 3) {win = true;}
        }
        if (win) {
            this.setState({
                gameover: true, 
                winner: `Winner is player ${potentialWinner}`,
                boardClickable: new Array(9).fill(false)
            });
        }
        if (this.state.actions.length === 9 && !win) {
            this.setState({gameover: true, winner: 'Draw'});
        }
    }
    render(){
        return (
            <div className="app">
                <h2 className="title">Tic-Tac-Toe</h2>
                {this.state.gameover? <h3 className="winner">{this.state.winner}</h3> : <h3 className="nextPlayer">Next Player: {this.state.whosturn}</h3>}
                <div className="clickable">
                    <Board board={this.state.board} handlePlay={this.handlePlay} />
                    <Action actions={this.state.actions} handleRewind={this.handleRewind} />
                </div>
            </div>
        );
    }
}

class Board extends Component{
    constructor(props){
        super(props);
    }
    square=(i)=>{
        return <Square value={this.props.board[i]} onClick={()=>{this.props.handlePlay(i)}} />
    }
    render(){
        return (
            <div className="board">
                <div className="boardRow">
                    {this.square(0)}
                    {this.square(1)}
                    {this.square(2)}</div>
                <div className="boardRow">
                    {this.square(3)}
                    {this.square(4)}
                    {this.square(5)}</div>
                <div className="boardRow">
                    {this.square(6)}
                    {this.square(7)}
                    {this.square(8)}</div>
                
            </div>
        );
    }
}
function Square(props){
    return (
        <div className="square" onClick={props.onClick}>
            {props.value === 1 ? 'X' : props.value === 2 ? 'O' : null}
        </div>
    );
}

class Action extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="action">
                <ol>
                    {this.props.actions.map(
                        (val,ind)=>(
                            <li key={ind}>
                                <button className="rewindButton" onClick={()=>this.props.handleRewind(ind)} >go back to move #{ind} </button>
                            </li>
                        )
                    )}
                </ol>
            </div>
        );
    }
}


export default App;