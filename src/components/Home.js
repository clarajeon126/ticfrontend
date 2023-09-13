import React from 'react'
import '../App.css';
import { Link } from 'react-router-dom';

const Home = () => {

  return (
    <div className='homeCenter'>
        <h1 className='homeTitle'>
            Tic Tac Twist!
        </h1>
        <div className='buttonDiv'>
            <Link to={"/joincreate"} className="homeButtons">play</Link>
            <Link to={"/rules"} className="homeButtons">rules</Link>
        </div>

    </div>
  )
}

export default Home