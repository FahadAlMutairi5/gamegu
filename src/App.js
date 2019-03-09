import React, { Component } from 'react';

import './App.css';

class App extends Component {
  state = {
    goolNum:0,
    gussNumB:[],
    gussNum:[],
    count:5,
    gussvalue:[],
  }

  componentDidMount(){
    if (this.state.goolNum === 0 || this.state.gussvalue.length < 1){
      this.initializeGame();
    }
  }
  componentDidUpdate(){
    if (this.state.goolNum === 0 || this.state.gussvalue.length < 1){
      this.initializeGame();
    }
  }
  initializeGame = () => {
    const goolNum = Math.floor((Math.random() * 30)+ 1);
    const gussvalue = [];
        for (let i = 0; i < 9; i++) {
            let t = this.checkDuplicate(gussvalue);        
            gussvalue.push(t);
        }
    this.setState({goolNum:goolNum ,gussvalue:gussvalue})
  }
  restart = () =>{
        this.setState({
            goolNum:0,
            gussNumB:[],
            gussNum:[],
            count:5,
            gussvalue:[],
        })
        this.initializeGame();
    }
  checkDuplicate = (gussvalue) => {
    let val = Math.floor((Math.random() * 20) + 1),
            na = gussvalue.find(item => item === val);
        if(na){
            return this.checkDuplicate(gussvalue);
        }
        else{
            return val;
        }
  }
  revealBrick = (i) => {
    let v = this.state.gussvalue[i];
    if (!this.state.gussNum.includes(v)){
    this.setState({gussNumB:[...this.state.gussNumB, i] , gussNum:[...this.state.gussNum, v], count: this.state.count-1}, ()=>console.log(this.state.gussNumB));
    }
    }
  changeGuss = event => this.setState({gussNum: +event.target.value})
  
  sum = (gussNum) => {
    return gussNum.reduce((partial_sum, a) => partial_sum + a, 0);
  }
  show = () => {
      console.log("H");
      if ( this.state.gussNum === this.state.goolNum){
        alert("Good Guss");
      }
    };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Guess behind the bricks!</h1>
          <div className="score">
            <h2>Target: <span>{this.state.goolNum}</span></h2>
            <h2>Sum: <span>{this.state.gussNum.reduce((partial_sum, a) => partial_sum + a, 0)}</span></h2>
            <div className="result-bar">
              <h2>Remaining: <span>{this.state.count}</span></h2>
            </div>
          </div>
        </header>
          <div>
            <div className={`wrapper ${ (this.state.count === 0 || this.state.goolNum <= this.state.gussNum.reduce((partial_sum, a) => partial_sum + a, 0)) ? 'hide' : ''}`}>
              {
                this.state.gussvalue.map((brick, index) =>
                  <div
                    key={brick + 3}
                    className={`brick ${ this.state.gussNumB.includes(index) ? '' : 'hide'} animated rollIn`}
                    onClick={() => this.revealBrick(index)}
                  >
                    <span>{brick}</span>
                  </div>
                )
              }
            </div>
            <div className={`scoreboard ${ this.state.count === 0  this.state.goolNum <= this.state.gussNum.reduce((partial_sum, a) => partial_sum + a, 0) ? '' : 'hide' }`}>
              <h2 className="scoreboard-heading animated bounceInLeft">
                Score Board
              </h2>
              { 
                this.state.goolNum === this.state.gussNum.reduce((partial_sum, a) => partial_sum + a, 0) ? <h1 className="animated jackInTheBox">Congratulations! You Won</h1> :
                        <h1 className="animated jackInTheBox">You Loss! :(</h1>
              }
              <button class="animated wobble" onClick={this.restart}>Play Again!</button>
            </div>
          </div>
        
      </div>
    );
  }
}

export default App;
