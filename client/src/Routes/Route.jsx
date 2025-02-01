import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "../Components/Register";
import Login from "../Components/Login";
import Error from "../Components/Error";
import ProfilePage from "../Components/Profile";
import OtpPage from "../Components/Otpage";

export default function RouteSurf() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/otp" element={<OtpPage />} />
      <Route path="/home" element={<ProfilePage />} />
      <Route path="/404" element={<Error />} />
    </Routes>
  );
}