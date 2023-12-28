import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home, SignIn, SignUp, Profile, ForgotPassword, Offers } from "./pages";

const RouterApp = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/offers" element={<Offers />} />
        </Routes>
      </Router>
    </>
  );
};

export default RouterApp;
