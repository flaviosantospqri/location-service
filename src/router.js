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
  CreateListing,
  EditListing,
  Listing,
} from "./pages";
import { PrivateRoute } from "./components";

const RouterApp = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/offers" element={<Offers />} />
        <Route
          path="/category/:categoryName/:listingId"
          element={<Listing />}
        />
        <Route path="/create-listing" element={<PrivateRoute />}>
          <Route path="/create-listing" element={<CreateListing />} />
        </Route>
        <Route path="/edit-listing" element={<PrivateRoute />}>
          <Route path="/edit-listing/:listingId" element={<EditListing />} />
        </Route>
        <Route path="/*" element={<Page404 />} />
      </Routes>
    </>
  );
};

export default RouterApp;
