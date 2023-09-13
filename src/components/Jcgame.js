import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import socket from "./SocketConfig";

const Jcgame = () => {
    const navigate = useNavigate();
    const [room, setRoom] = useState("");
    const [user, setUser] = useState('');
    const [nospace, setNoSpace] = useState(false);

    const joinGame = () => {
        if(room !== ''){
            console.log("in")
            socket.emit("join_room", {room: room});
        }
    };
    useEffect(() => {
        socket.on("1stPlayer", (data) => {
            console.log("1stPlayer");
            setUser('x');
            navigate(`/game/${data.room}/x`);
        });
        socket.on("2ndPlayer", (data) => {
            setUser('o');
            navigate(`/game/${data.room}/o`);
        });
        socket.on("no_space", (data) => {
            setNoSpace(true);
        });
      }
    , []);

  return (
    <div className='homeCenter'>
        <Link to={"/"} className="backButton">back</Link>

        <div className='buttonDiv'>
            <h1>join the same game as a friend!</h1>
            <input value={room} onChange={e => setRoom(e.target.value)} type="text" className='gameInput' placeholder="enter game name" />
            <button onClick={joinGame} className="homeButtons">join</button>
            {nospace ? <h1>this room is full D:</h1> : <></>}
        </div>
    </div>
  )
}

export default Jcgame