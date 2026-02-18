import "./App.css";
import { Route, Routes } from "react-router";
import PrivateRoute from "./components/auth/PrivateRoute";
import AuthProvider from "./context/AuthProvider";
import { lazy } from "react";

const Login = lazy(() => import("./pages/login"));
const NoteLayout = lazy(() => import("./components/layouts/NoteLayout"));
const Workspace = lazy(() => import("./components/notes/Workspace"));
const NoFound = lazy(() => import("./pages/NoFound"));

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <NoteLayout />
            </PrivateRoute>
          }
        >
          <Route
            path="notes/:id"
            element={
              <PrivateRoute>
                <Workspace />
              </PrivateRoute>
            }
          />
        </Route>

        <Route path="*" element={<NoFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
