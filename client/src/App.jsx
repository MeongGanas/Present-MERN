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
import { AuthProvider } from "./hooks/authContext";
import ProtectedRoute from "./hooks/protectedRoute";

export default function App() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <DataProvider>
          <LoadingProvider>
            <Routes>
              <Route path="/" element={<Selection />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="*"
                element={
                  <TabProvider>
                    <LayoutProvider>
                      <ResourceProvider>
                        <Layout>
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
                        </Layout>
                      </ResourceProvider>
                    </LayoutProvider>
                  </TabProvider>
                }
              />
            </Routes>
          </LoadingProvider>
        </DataProvider>
      </ProtectedRoute>
    </AuthProvider>
  );
}
