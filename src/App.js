import "./design.min.css";
import "./design.css";
import "./fontawesome-free/css/all.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Portal from "./Portal";
import Dashboard from "./Dashboard";
import Home from "./Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/portal" element={<Portal />}>
          <Route path="dashboard" element={<Dashboard/>} />
          <Route path="home" element={<Home/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
