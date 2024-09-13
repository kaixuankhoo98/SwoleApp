import { lazy } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import Home from "../Home/Home";
import { GenericErrorBoundary } from "../../shared/components/Error/GenericErrorBoundary";

// const Home = lazy(() => import('../Home/Home'));
const Profile = lazy(() => import("../Home/Home")); // TODO: change
const Workout = lazy(() => import("../Workout/Workout")); // TODO: change

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <GenericErrorBoundary>
        <Home />
      </GenericErrorBoundary>
    ),
  },
  {
    path: "/profile",
    element: (
      <GenericErrorBoundary>
        <Profile />
      </GenericErrorBoundary>
    ),
  },
  {
    path: "/workout",
    element: (
      <GenericErrorBoundary>
        <Workout />
      </GenericErrorBoundary>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/" />
  },
]);

export default router;
