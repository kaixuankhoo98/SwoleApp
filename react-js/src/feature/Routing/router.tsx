import { lazy } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import Home from "../Home/Home";
import { GenericErrorBoundary } from "../../shared/components/Error/GenericErrorBoundary";
import { ProtectedRoute } from "./ProtectedRoute";
import { Login } from "../Auth/Login";
import { SignUp } from "../Auth/SignUp";

// const Profile = lazy(() => import("../Home/Home")); 
const ConfigureWorkouts = lazy(() => import("../ConfigureWorkouts/ConfigureWorkouts"));
const Workout = lazy(() => import("../Workout/Workout"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <GenericErrorBoundary>
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      </GenericErrorBoundary>
    ),
  },
  {
    path: "/profile",
    element: (
      <GenericErrorBoundary>
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      </GenericErrorBoundary>
    ),
  },
  {
    path: "/workout",
    element: (
      <GenericErrorBoundary>
        <ProtectedRoute>
          <Workout />
        </ProtectedRoute>
      </GenericErrorBoundary>
    ),
  },
  {
    path: "/configure",
    element: (
      <GenericErrorBoundary>
        <ProtectedRoute>
          <ConfigureWorkouts />
        </ProtectedRoute>
      </GenericErrorBoundary>
    ),
  },
  {
    path: "/login",
    element: (
      <GenericErrorBoundary>
        <Login />
      </GenericErrorBoundary>
    ),
  },
  {
    path: "/signup",
    element: (
      <GenericErrorBoundary>
        <SignUp />
      </GenericErrorBoundary>
    )
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);

export default router;
