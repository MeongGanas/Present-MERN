import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Selection from "./pages/Selection";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AbsentDetail from "./pages/AbsentDetail";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Selection />} />
        <Route path="/home" element={<Home />} />
        <Route path="/list/:id" element={<AbsentDetail />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}
