import React, { useEffect, useState } from 'react'
import socket from "./SocketConfig";
import { Link, useParams } from 'react-router-dom'
import Board from './Board';
import GameOver from './GameOver';

const Game = () => {
  const [boardString, setBoardString] = useState("eeeeeeeeeeeeeeeeeeeeeeeeeee");
  const [boardTemp, setBoardTemp] = useState(boardString);
  const [user, setUser] = useState('');
  const [empty, setEmpty] = useState(true);
  const {room, first} = useParams();
  const [xPts, setXPts] = useState(0);
  const [oPts, setOPts] = useState(0);
  const [winner, setWinner] = useState('');
  const [turn, setTurn] = useState('x');
  const [board, setBoard] = useState(0);
  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);
  const [selectedString, setSelectedString] = useState('');
  const [prevBoard, setPrevBoard] = useState(0);

  useEffect(() => {
    setBoardTemp(boardString);
  }, [boardString]);

  useEffect(() => {
    setUser(first);

    //you are the second player
    if(first === 'o'){
      setEmpty(false);
    }

    //2nd player joined
    socket.on("2ndPlayer_joined", (data) => { 
      setEmpty(false);
    });

    socket.on("move_made_server", (data) => {
      
        console.log("here " + data)
        setBoardString(data.string);
        setXPts(data.xPts);
        setOPts(data.oPts);
        //if someone won or tie?
        console.log("win! " + data.winner);
        if(data.winner !== ''){
          setWinner(data.winner);
        }
        setTurn(first);


    });
  }, []);

  //run when game ended
  // useEffect(() => {
  //   if(winner !== ''){
  //     alert(`game over! ${winner} won!`)
  //   }
  // }, [winner]);

  //calculate points and add it to the state if needed
  const calcPoints = () => {
    let r = row;
    let c = col;
    let b = board;

    let boardInQ = "";
    let pts = 0;

    if(b === 1){
      boardInQ = boardTemp.slice(0,9);
    }
    else if(b === 2){
      boardInQ = boardTemp.slice(9,18);
    }
    else {
      boardInQ = boardTemp.slice(18,27);
    }
    console.log("calculating" + "row: " + r + "col: " + c + "board: " + b +" boardInQ: " + boardInQ)
    
    //check row
    if((boardInQ[(r-1) * 3] == boardInQ[(r-1) * 3 + 1]) && (boardInQ[(r-1) * 3] == boardInQ[(r-1) * 3 + 2])){
      console.log("row");
      pts++;
    }

    //check col
    if(boardInQ[(c-1)] == boardInQ[(c-1) + 3] && boardInQ[(c-1)] == boardInQ[(c-1) + 6]){
      pts++;
    }


    //need to look at diag too
    if((r === 1 || r === 3) && (c === 1 || c === 3)){
      if((r === 1 & c === 1) || (r === 3 & c === 3)){
        if(boardInQ[0] === boardInQ[4] && boardInQ[0] === boardInQ[8]){
          pts++;
        }
      }
      if((r === 1 & c === 3) || (r === 3 & c === 1)){
        if(boardInQ[2] === boardInQ[4] && boardInQ[2] === boardInQ[6]){
          pts++;
        }
      }
    }
    

    setTurn(turn === 'x' ? 'o' : 'x');
    if(pts > 0){
      if(user === 'x'){
        setXPts(xPts + pts);
        let result = checkEnd();
        setPrevBoard(b);

        socket.emit('move_made', {string: boardTemp, winner: result, xPts: xPts + pts, oPts: oPts});
      }
      else {
        setOPts(oPts + pts);
        let result = checkEnd();
        setPrevBoard(b);

      socket.emit('move_made', {string: boardTemp, winner: result, xPts: xPts, oPts: oPts + pts});
      }
    }
    else {
      console.log('uh')
      let result = checkEnd();
      setPrevBoard(b);

      socket.emit('move_made', {string: boardTemp, winner: result, xPts: xPts, oPts: oPts});
    }
  }

  //check if game is over
  const checkEnd = () => {
    //game not done yet
    if(boardTemp.includes('e')){
      return '';
    }
    //game is done
    else {
      let resp = checkWinner();

      setWinner(resp);

      return resp;
    }
  }

  //if game is over, check who won
  const checkWinner = () => {
    if(xPts > oPts){
      return 'x';
    }
    else if(oPts > xPts){ 
      return 'o';
    }
    else {
      return 'tie';
    }
  }

  //user made a move
  const moveMade = () => {
    setBoardString(boardTemp);

    calcPoints(board,row,col);
  };

  useEffect(() => {
    if(selectedString !== ''){
      console.log("lolol " + selectedString);
      setBoard(parseInt(selectedString[0]));
      setRow(parseInt(selectedString[1]));
      setCol(parseInt(selectedString[2]));
  
    }
  }, [selectedString]);

  useEffect(() => {
    if(board !== 0){
      let index = (board - 1) * 9 + (row - 1) * 3 + (col - 1);
      setBoardTemp(boardString.substring(0, index) + user + boardString.substring(index + 1));
    }

  }, [board,row,col])
  
  return (
    <div className='homeCenter'>
        <Link to={"/"} className="backButton">exit</Link>
        {winner !== '' ? <GameOver xScore={xPts} oScore={oPts} youAreWin={winner === first} isATie={winner === 'tie'}/> : 
        <>
        <h1>you are in {room}</h1>
        {empty ? <h1>waiting for another player to join...</h1> : 
        <>
          <h1>
            you are playing as {user}
          </h1>
          <div className='scoreboard'>
            <h1>scoreboard</h1>
            <h1>x: {xPts}</h1>
            <h1>o: {oPts}</h1>
          </div>
          <div className='threeBoardContainer'>
              
              <Board prevBoard={(!boardTemp.slice(9,18).includes('e') && !boardTemp.slice(18,27).includes('e')) ? 0 : prevBoard} boardNum={1} selectSquare={setSelectedString} stringForBoard={boardTemp.slice(0,9)} myTurn={turn === user}/>
              <Board prevBoard={(!boardTemp.slice(0,9).includes('e') && !boardTemp.slice(18,27).includes('e')) ? 0 : prevBoard} boardNum={2} selectSquare={setSelectedString} stringForBoard={boardTemp.slice(9,18)} myTurn={turn === user}/>
              <Board prevBoard={(!boardTemp.slice(9,18).includes('e') && !boardTemp.slice(0,9).includes('e')) ? 0 : prevBoard} boardNum={3} selectSquare={setSelectedString} stringForBoard={boardTemp.slice(18,27)} myTurn={turn === user}/>
          </div>
          <button onClick={moveMade} className='homeButtons'>send my move!</button>
        </>
        }
        </>}
        
        
    </div>
  )
}

export default Game