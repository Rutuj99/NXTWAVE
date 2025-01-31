import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "../Components/Register";
import Login from "../Components/Login";
import MainHome from "../Components/MainHome";
import Error from "../Components/Error";

export default function RouteSurf() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<MainHome />} />
      <Route path="/404" element={<Error />} />
    </Routes>
  );
}