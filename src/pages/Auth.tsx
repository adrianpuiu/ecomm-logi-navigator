
import React from "react";
import { Helmet } from "react-helmet";
import { Navigate } from "react-router-dom";

export default function Auth() {
  // Always redirect to home page since auth is removed
  return <Navigate to="/" />;
}
