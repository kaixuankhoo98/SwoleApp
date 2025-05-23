import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { apiRequest } from "../shared/hooks/api";

type User = { userId: number, username: string };

const AuthContext = createContext<{
  user: User | null;
  isLoading: boolean;
  setUser: (u: User | null) => void;
  validate: () => Promise<void>;
}>({
  user: null,
  isLoading: true,
  setUser: () => {},
  validate: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // const location = useLocation();

  // TODO: try to stop validate when on login or signup page
  const validate = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await apiRequest<User>("/validate");
      setUser({ userId: res.userId, username: res.username });
    } catch (err) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // if (location.pathname === "/login" || location.pathname === "/signup") {
    //   setIsLoading(false);
    //   return;
    // }
    validate();
  }, [validate, location.pathname]);

  return (
    <AuthContext.Provider value={{ user, isLoading, setUser, validate }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
