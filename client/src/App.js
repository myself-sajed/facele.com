import Navbar from "./components/Navbar";
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Login from "./components/Login";
import Welcome from "./components/Welcome";
import Rooms from "./components/Rooms";
import Room from "./components/Room";



function App() {
  return (
    <div className="pad">
      <Navbar title={false} />

      <Routes>

        <Route path="/" exact element={<Welcome />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/rooms" exact element={<Rooms />} />
        <Route path="/room/:roomId" exact element={<Room />} />

      </Routes>
      <br /><br />

    </div>
  );
}

export default App;
