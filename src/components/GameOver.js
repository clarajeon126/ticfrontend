import React from 'react'
import socket from './SocketConfig'

const GameOver = ({xScore, oScore, youAreWin, isATie}) => {
    
    socket.leave(socket.room);
  return (
    <div className='endGameScreen'>
        <h1>Game over!</h1>
        {youAreWin ? <h1>You win!</h1> : <>{isATie ? <h1>A tie!</h1> : <h1>You lose!</h1>}</>}
        <h1>score was: </h1>
        <h1>x: {xScore}</h1>
        <h1>o: {oScore}</h1>
    </div>
  )
}

export default GameOver