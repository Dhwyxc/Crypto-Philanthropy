import { lazy } from "react";
import React from "react";
const ProjectHome = lazy(() => import("../pages/"));
const MeProject = lazy(() => import("../pages/me"));
const CreateProject = lazy(() => import("../pages/create"));
const ShowProject = lazy(() => import("../pages/show"));

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

];
export default projectRoutes;
