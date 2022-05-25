import { lazy } from "react";
import React from "react";
// import Login from "../pages/login";
// import Register from "../pages/register";
const CreateVote = lazy(() => import("../pages/create-vote"));
const Poll = lazy(() => import("../pages/vote"));
const PollResult = lazy(() => import("../pages/vote-result"));
const UserPoll = lazy(() => import("../pages/user-poll"));
const UserAnswers = lazy(() => import("../pages/user-answers"));

// const ForgetPassword = lazy(() => import("../pages/forget-password"));

const votingRoutes = [
  {
    component: CreateVote,
    path: "/",
  },
  {
    component: Poll,
    path: "/poll/:pollId",
  },
  {
    component: PollResult,
    path: "poll/:pollId/result",
  },
  {
    component: UserPoll,
    path: "/user/poll",
  },
  {
    component: UserAnswers,
    path: "/user/answers",
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
export default votingRoutes;
