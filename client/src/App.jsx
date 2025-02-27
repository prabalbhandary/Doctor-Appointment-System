import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import ProtectedRoutes from "./components/ProtectedRoutes";
import PublicRoutes from "./components/PublicRoutes";

const App = () => {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
      <Router>
        {
          loading ? (
            <Spinner />
          ) : (
            <Routes>
            <Route path="/" element={<ProtectedRoutes><Home /></ProtectedRoutes>} />
            <Route path="/login" element={<PublicRoutes><Login /></PublicRoutes>} />
            <Route path="/register" element={<PublicRoutes><Register /></PublicRoutes>} />
          </Routes>
          )
        }
      </Router>
    </>
  );
};

export default App;
