import "./App.css";
import { Route, Routes } from "react-router";
import NoteLayout from "./components/layouts/NoteLayout";
import Workspace from "./components/notes/Workspace";
import PrivateRoute from "./components/auth/PrivateRoute";
import Login from "./pages/login";
import AuthProvider from "./context/AuthProvider";

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
      </Routes>
    </AuthProvider>
  );
}

export default App;
