import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";
import "./styles.css";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/movies/:id" element={<MovieDetail />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
