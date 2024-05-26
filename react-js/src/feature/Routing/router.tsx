import { lazy } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import Home from "../Home/Home";

// const Home = lazy(() => import('../Home/Home'));
const Profile = lazy(() => import('../Home/Home')); // TODO: change
const Workout = lazy(() => import('../Workout/Workout')); // TODO: change

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/workout",
    element: <Workout />
  },
  {
    path: "*",
    element: <Navigate to="/"/>
  },
]);

export default router;