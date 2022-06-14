import { lazy } from "react";
import React from "react";
// import CreateProject from "../pages/create";
// import Login from "../pages/login";
// import Register from "../pages/register";
const ProjectHome = lazy(() => import("../pages/"));
const MeProject = lazy(() => import("../pages/me"));
const CreateProject = lazy(() => import("../pages/create"));
const ShowProject = lazy(() => import("../pages/show"));
// const ForgetPassword = lazy(() => import("../pages/forget-password"));

const projectRoutes = [
  {
    component: CreateProject,
    path: "/project/create",
  },
  {
    component: MeProject,
    path: "/project/me",
  },
  {
    component: ShowProject,
    path: "/project/:id",
  },
  {
    component: ProjectHome,
    path: "/project",
  },

  // {
  //   component: ForgetPassword,
  //   path: "/forget-password",
  //   exact: true,
  // },
];
export default projectRoutes;
