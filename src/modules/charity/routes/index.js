import { lazy } from "react";
import React from "react";
// import Login from "../pages/login";
// import Register from "../pages/register";
const Home = lazy(() => import("../pages/home"));

// const ForgetPassword = lazy(() => import("../pages/forget-password"));

const charityRoutes = [
  {
    component: Home,
    path: "/",
  },
  //   {
  //     component: Register,
  //     path: "/register",
  //   },
  // {
  //   component: ForgetPassword,
  //   path: "/forget-password",
  //   exact: true,
  // },
];
export default charityRoutes;
