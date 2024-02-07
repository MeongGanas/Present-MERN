import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Selection from "./pages/Selection";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AbsentDetail from "./pages/AbsentDetail";
import Settings from "./pages/Settings";
import Layout from "./Layout/layout";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Selection />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="*"
        element={
          <Layout>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/:listname" element={<AbsentDetail />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Layout>
        }
      />
    </Routes>
  );
}
