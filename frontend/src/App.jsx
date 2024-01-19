import Auth from "./layouts/Auth";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Admin from "./layouts/Admin";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

export default function App(props) {
  console.log(props);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Auth>
              {" "}
              <Login />{" "}
            </Auth>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <Auth>
              {" "}
              <ForgotPassword />{" "}
            </Auth>
          }
        />
        <Route
          path="/login"
          element={
            <Auth>
              {" "}
              <Login />{" "}
            </Auth>
          }
        />
        <Route
          path="/register"
          element={
            <Auth>
              {" "}
              <Signup />{" "}
            </Auth>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Admin pageName="Dashboard">
              {" "}
              <Dashboard />{" "}
            </Admin>
          }
        />
        <Route
          path="/profile"
          element={
            <Admin pageName="Profile">
              {" "}
              <Profile />{" "}
            </Admin>
          }
        />
      </Routes>
    </>
  );
}
