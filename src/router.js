import "./index.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  Home,
  SignIn,
  SignUp,
  Profile,
  ForgotPassword,
  Offers,
  Page404,
} from "./pages";

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
        <Route path="/*" element={<Page404 />} />
      </Routes>
    </>
  );
};

export default RouterApp;
