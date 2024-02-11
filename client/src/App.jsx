import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Selection from "./pages/Selection";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AbsentDetail from "./pages/AbsentDetail";
import Settings from "./pages/Settings";
import Layout from "./Layout/layout";
import { LayoutProvider } from "./hooks/dialogContext";
import { TabProvider } from "./hooks/tabContext";
import { LoadingProvider } from "./hooks/loadingContext";

export default function App() {
  return (
    <LoadingProvider>
      <Routes>
        <Route path="/" element={<Selection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="*"
          element={
            <LayoutProvider>
              <Layout>
                <Routes>
                  <Route
                    path="/home"
                    element={
                      <TabProvider>
                        <Home />
                      </TabProvider>
                    }
                  />
                  <Route
                    path="/:listname"
                    element={
                      <TabProvider>
                        <AbsentDetail />
                      </TabProvider>
                    }
                  />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </Layout>
            </LayoutProvider>
          }
        />
      </Routes>
    </LoadingProvider>
  );
}
