import React from "react";
import "./App.css";
import MainPage from "./pages/MainPage";
import EditProfilePage from "./pages/EditProfilePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Layout />}>
          <Route path="" element={<MainPage />} />
          <Route path="edit/:userId" element={<EditProfilePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
