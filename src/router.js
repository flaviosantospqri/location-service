import "./index.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, SignIn, SignUp, Profile, ForgotPassword, Offers } from "./pages";

const RouterApp = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/offers" element={<Offers />} />
      </Routes>
    </>
  );
};

export default RouterApp;
