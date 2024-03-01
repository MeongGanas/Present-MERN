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
import { DataProvider } from "./hooks/dataContext";
import { ResourceProvider } from "./hooks/resourceContext";
import { WaktuProvider } from "./hooks/waktuContext";
import ProtectedRoute from "./hooks/protectedRoute";
import ProtectedRouteLogin from "./hooks/protectedRouteLogin";

export default function App() {
  return (
    <DataProvider>
      <LoadingProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRouteLogin>
                <Selection />
              </ProtectedRouteLogin>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectedRouteLogin>
                <Login />
              </ProtectedRouteLogin>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRouteLogin>
                <Register />
              </ProtectedRouteLogin>
            }
          />
          <Route
            path="*"
            element={
              <TabProvider>
                <LayoutProvider>
                  <ResourceProvider>
                    <Layout>
                      <ProtectedRoute>
                        <Routes>
                          <Route path="/home" element={<Home />} />
                          <Route
                            path="/detailAbsent/:absentId/:absentName"
                            element={
                              <WaktuProvider>
                                <AbsentDetail />
                              </WaktuProvider>
                            }
                          />
                          <Route path="/settings" element={<Settings />} />
                        </Routes>
                      </ProtectedRoute>
                    </Layout>
                  </ResourceProvider>
                </LayoutProvider>
              </TabProvider>
            }
          />
        </Routes>
      </LoadingProvider>
    </DataProvider>
  );
}
