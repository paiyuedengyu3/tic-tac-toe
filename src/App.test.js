import App from "./App";
import {shallow, mount, render} from "enzyme";
import { isTSAnyKeyword } from "@babel/types";

describe("A suite",()=>{
    it("should render",()=>{
        expect()
    });
});

/*describe("A suite",()=>{
    it("should render without throwing an error",()=>{
        expect(shallow(<App />).contains(            
        <div className="app">
        <h2 className="title">Tic-Tac-Toe</h2>
        {this.state.gameover? <h3 className="winner">{this.state.winner}</h3> : <h3 className="nextPlayer">Next Player: {this.state.whosturn}</h3>}
        <div className="clickable">
            <Board board={this.state.board} handlePlay={this.handlePlay} />
            <Action actions={this.state.actions} handleRewind={this.handleRewind} />
        </div>
    </div>).toBe(true));
    });
});*/