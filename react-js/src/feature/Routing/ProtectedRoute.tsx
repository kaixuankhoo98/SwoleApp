import { Navigate } from "react-router-dom";
import Main from "../Main/Main";
import { useAuth } from "../../app/AuthContext";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Main>
        <div>Loading...</div>
      </Main>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};