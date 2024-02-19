import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import Organizer from "./Register/Organizer";
import Register from "./Register/Register";
import Coach from "./Register/Coach";
import Main from "./Main/Main";
import DanceClub from "./Danceclub/DanceClub";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route
            exact
            path="/register-organizer"
            element={<Organizer />}
          ></Route>
          <Route exact path="/register-coach" element={<Coach />}></Route>
          <Route exact path="/dance-club" element={<DanceClub />}></Route>
          <Route exact path="/" element={<Main />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
