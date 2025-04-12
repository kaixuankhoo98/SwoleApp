import { lazy } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import Home from "../Home/Home";
import { GenericErrorBoundary } from "../../shared/components/Error/GenericErrorBoundary";
import { ProtectedRoute } from "./ProtectedRoute";

// const Profile = lazy(() => import("../Home/Home")); 
const Workout = lazy(() => import("../Workout/Workout")); 
const Login = lazy(() => import("../Auth/Login")); 

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
    path: "/login",
    element: (
      <GenericErrorBoundary>
        <Login />
      </GenericErrorBoundary>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);

export default router;
