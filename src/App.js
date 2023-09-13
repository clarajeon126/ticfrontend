import {BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css';
import Home from "./components/Home";
import Jcgame from "./components/Jcgame";
import Rules from "./components/Rules";
import Game from "./components/Game";

function App() {
  // const xClicked = () => {
  //   socket.emit('xClicked', {message: "hi"});
  // };

  // const oClicked = () => {
  //   socket.emit('oClicked');
  // };

  // useEffect(() => {
  //   socket.on('received x', (data) => {
  //     alert(data.message)
  //   });
  // }, []);
  return (
    <BrowserRouter>
        <div className="App"> 
          <Routes>
              <Route exact path="/" element={<Home />}></Route>
              <Route exact path="/joincreate" element={<Jcgame />}></Route>
              <Route exact path="/rules" element={<Rules />}></Route>
              <Route path="/game/:room/:first" element={<Game />}></Route>
          </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
